package router

import (
	"os"
	"runtime"
	"runtime/debug"
)

// GoInfo represents comprehensive Go runtime information
type GoInfo struct {
	GoVersion  string            `json:"GoVersion"`
	GOOS       string            `json:"GOOS"`
	GOARCH     string            `json:"GOARCH"`
	NumCPU     int               `json:"NumCPU"`
	GOMAXPROCS int               `json:"GOMAXPROCS"`
	Env        map[string]string `json:"Env"`
	Build      BuildInfo         `json:"Build"`
	MemStats   MemoryStats       `json:"MemStats"`
}

// BuildInfo contains build and dependency information
type BuildInfo struct {
	Path string   `json:"Path"`
	Main Module   `json:"Main"`
	Deps []Module `json:"Deps"`
}

// Module represents a Go module
type Module struct {
	Path    string  `json:"Path"`
	Version string  `json:"Version"`
	Sum     string  `json:"Sum"`
	Replace *Module `json:"Replace"`
}

// MemoryStats contains memory and GC statistics
type MemoryStats struct {
	// General statistics
	Alloc      uint64 `json:"Alloc"`
	TotalAlloc uint64 `json:"TotalAlloc"`
	Sys        uint64 `json:"Sys"`
	Lookups    uint64 `json:"Lookups"`
	Mallocs    uint64 `json:"Mallocs"`
	Frees      uint64 `json:"Frees"`

	// Heap statistics
	HeapAlloc    uint64 `json:"HeapAlloc"`
	HeapSys      uint64 `json:"HeapSys"`
	HeapIdle     uint64 `json:"HeapIdle"`
	HeapInuse    uint64 `json:"HeapInuse"`
	HeapReleased uint64 `json:"HeapReleased"`
	HeapObjects  uint64 `json:"HeapObjects"`

	// Stack and other memory
	StackInuse  uint64 `json:"StackInuse"`
	StackSys    uint64 `json:"StackSys"`
	MSpanInuse  uint64 `json:"MSpanInuse"`
	MSpanSys    uint64 `json:"MSpanSys"`
	MCacheInuse uint64 `json:"MCacheInuse"`
	MCacheSys   uint64 `json:"MCacheSys"`
	BuckHashSys uint64 `json:"BuckHashSys"`
	GCSys       uint64 `json:"GCSys"`
	OtherSys    uint64 `json:"OtherSys"`

	// GC statistics
	NextGC        uint64   `json:"NextGC"`
	LastGC        uint64   `json:"LastGC"`
	PauseTotalNs  uint64   `json:"PauseTotalNs"`
	PauseNs       []uint64 `json:"PauseNs"`
	PauseEnd      []uint64 `json:"PauseEnd"`
	NumGC         uint32   `json:"NumGC"`
	NumForcedGC   uint32   `json:"NumForcedGC"`
	GCCPUFraction float64  `json:"GCCPUFraction"`
	EnableGC      bool     `json:"EnableGC"`
	DebugGC       bool     `json:"DebugGC"`
}

// Register the Go info loader
var _ = NewLoader("/_index", func(c *LoaderCtx) (*GoInfo, error) {
	return collectGoInfo(), nil
})

// collectGoInfo gathers comprehensive runtime information
func collectGoInfo() *GoInfo {
	info := &GoInfo{
		GoVersion:  runtime.Version(),
		GOOS:       runtime.GOOS,
		GOARCH:     runtime.GOARCH,
		NumCPU:     runtime.NumCPU(),
		GOMAXPROCS: runtime.GOMAXPROCS(0),
		Env:        collectGoEnv(),
		Build:      collectBuildInfo(),
		MemStats:   collectMemStats(),
	}

	return info
}

// collectGoEnv collects Go-related environment variables
func collectGoEnv() map[string]string {
	env := make(map[string]string)

	goEnvVars := []string{
		"GOPATH",
		"GOROOT",
		"CGO_ENABLED",
		"GO111MODULE",
		"GOPROXY",
		"GOSUMDB",
		"GOTOOLDIR",
		"GOCACHE",
		"GOMODCACHE",
		"GOPRIVATE",
		"GONOPROXY",
		"GONOSUMDB",
		"GOVCS",
		"GOINSECURE",
		"GOWORK",
	}

	for _, key := range goEnvVars {
		if value := os.Getenv(key); value != "" {
			env[key] = value
		}
	}

	if _, exists := env["GOROOT"]; !exists {
		if goroot := runtime.GOROOT(); goroot != "" {
			env["GOROOT"] = goroot
		}
	}

	if _, exists := env["CGO_ENABLED"]; !exists {
		if cgoEnabled, found := getCGOEnabled(); found {
			if cgoEnabled {
				env["CGO_ENABLED"] = "1"
			} else {
				env["CGO_ENABLED"] = "0"
			}
		}
	}

	return env
}

// collectBuildInfo gathers build and module information
func collectBuildInfo() BuildInfo {
	bi := BuildInfo{
		Path: "command-line-arguments",
		Main: Module{
			Path:    "command-line-arguments",
			Version: "(devel)",
			Sum:     "",
			Replace: nil,
		},
		Deps: []Module{},
	}

	if info, ok := debug.ReadBuildInfo(); ok && info != nil {
		if info.Path != "" {
			bi.Path = info.Path
		}

		if info.Main.Path != "" {
			bi.Main = Module{
				Path:    info.Main.Path,
				Version: info.Main.Version,
				Sum:     info.Main.Sum,
				Replace: nil,
			}
			if info.Main.Replace != nil {
				bi.Main.Replace = &Module{
					Path:    info.Main.Replace.Path,
					Version: info.Main.Replace.Version,
					Sum:     info.Main.Replace.Sum,
					Replace: nil,
				}
			}
		}

		for _, dep := range info.Deps {
			m := Module{
				Path:    dep.Path,
				Version: dep.Version,
				Sum:     dep.Sum,
				Replace: nil,
			}
			if dep.Replace != nil {
				m.Replace = &Module{
					Path:    dep.Replace.Path,
					Version: dep.Replace.Version,
					Sum:     dep.Replace.Sum,
					Replace: nil,
				}
			}
			bi.Deps = append(bi.Deps, m)
		}
	}

	return bi
}

// collectMemStats gathers memory and GC statistics
func collectMemStats() MemoryStats {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	stats := MemoryStats{
		// General statistics
		Alloc:      m.Alloc,
		TotalAlloc: m.TotalAlloc,
		Sys:        m.Sys,
		Lookups:    m.Lookups,
		Mallocs:    m.Mallocs,
		Frees:      m.Frees,

		// Heap statistics
		HeapAlloc:    m.HeapAlloc,
		HeapSys:      m.HeapSys,
		HeapIdle:     m.HeapIdle,
		HeapInuse:    m.HeapInuse,
		HeapReleased: m.HeapReleased,
		HeapObjects:  m.HeapObjects,

		// Stack and other memory
		StackInuse:  m.StackInuse,
		StackSys:    m.StackSys,
		MSpanInuse:  m.MSpanInuse,
		MSpanSys:    m.MSpanSys,
		MCacheInuse: m.MCacheInuse,
		MCacheSys:   m.MCacheSys,
		BuckHashSys: m.BuckHashSys,
		GCSys:       m.GCSys,
		OtherSys:    m.OtherSys,

		// GC statistics
		NextGC:        m.NextGC,
		LastGC:        m.LastGC,
		PauseTotalNs:  m.PauseTotalNs,
		NumGC:         m.NumGC,
		NumForcedGC:   m.NumForcedGC,
		GCCPUFraction: m.GCCPUFraction,
		EnableGC:      m.EnableGC,
		DebugGC:       m.DebugGC,
	}

	stats.PauseNs = []uint64{}
	stats.PauseEnd = []uint64{}

	return stats
}

// getCGOEnabled checks if CGO was enabled during build
func getCGOEnabled() (enabled bool, found bool) {
	if info, ok := debug.ReadBuildInfo(); ok && info != nil {
		for _, setting := range info.Settings {
			if setting.Key == "CGO_ENABLED" {
				return setting.Value == "1", true
			}
		}
	}
	return false, false
}
