package app

import (
	"embed"
	"net/http"
	"path"

	"github.com/river-now/river"
	"github.com/river-now/river/kit/colorlog"
	"github.com/river-now/river/kit/headels"
	"github.com/river-now/river/kit/htmlutil"
	"github.com/river-now/river/wave"
)

const (
	Domain          = "goinfo.vercel.app"
	Origin          = "https://" + Domain
	SiteTitle       = "Vercel + Go"
	SiteDescription = "Vercel + Go | Powered by Fluid compute"
)

var River = &river.River{
	Wave: Wave,
	GetHeadElUniqueRules: func() *headels.HeadEls {
		e := river.NewHeadEls(2)

		e.Meta(e.Property("og:title"))
		e.Meta(e.Property("og:description"))

		return e
	},
	GetDefaultHeadEls: func(r *http.Request) ([]*htmlutil.Element, error) {
		currentURL := path.Join(Origin, r.URL.Path)

		ogImgURL := Wave.GetPublicURL("og.webp")
		favURL := Wave.GetPublicURL("favicon.ico")

		if !wave.GetIsDev() {
			ogImgURL = "https://" + path.Join(Domain, ogImgURL)
		}

		e := river.NewHeadEls()

		e.Title(SiteTitle)
		e.Description(SiteDescription)

		e.Meta(e.Property("og:title"), e.Content(SiteTitle))
		e.Meta(e.Property("og:description"), e.Content(SiteDescription))
		e.Meta(e.Property("og:type"), e.Content("website"))
		e.Meta(e.Property("og:image"), e.Content(ogImgURL))
		e.Meta(e.Property("og:url"), e.Content(currentURL))

		e.Meta(e.Name("twitter:card"), e.Content("summary_large_image"))
		e.Meta(e.Name("twitter:site"), e.Content("@vercel"))

		e.Link(e.Rel("icon"), e.Attr("href", favURL), e.Attr("type", "image/x-icon"))

		return e.Collect(), nil
	},
	GetRootTemplateData: func(r *http.Request) (map[string]any, error) {
		// This gets fed into backend/__static/entry.go.html
		return map[string]any{}, nil
	},
}

//go:embed wave.config.json
var configBytes []byte

//go:embed all:__dist/static
var staticFS embed.FS

var Wave = wave.New(&wave.Config{
	ConfigBytes:            configBytes,
	StaticFS:               staticFS,
	StaticFSEmbedDirective: "all:__dist/static",
})

var Log = colorlog.New("goinfopage")
