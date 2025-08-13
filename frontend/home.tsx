import { useLoaderData, type RouteProps } from "./app_utils.ts";

export function Home(props: RouteProps<"/_index">) {
	const goInfo = useLoaderData(props);

	const envEntries = Object.entries(goInfo.Env || {});
	const hasEnvVars = envEntries.length > 0;

	return (
		<div className="min-h-screen bg-white font-mono relative">
			<div className="absolute top-4 right-4">
				<a
					href="https://github.com/sjc5/goinfo"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors text-xs"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
					</svg>
					<span>source</span>
				</a>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-4">
				{/* Header with logos */}
				<div className="text-center mb-0.5">
					<div className="flex items-center justify-center gap-8 mb-1">
						{/* Vercel Logo */}
						<div className="flex items-center gap-3">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="w-10 h-10"
							>
								<path
									d="M12 1L24 22H0L12 1Z"
									fill="#000000"
								></path>
							</svg>
						</div>

						<div className="text-gray-400 text-xl font-light">
							+
						</div>

						{/* Go Logo */}
						<div className="flex items-center gap-3">
							<svg
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="w-20 h-20"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M18.1177 14.0442C17.7408 14.1497 17.3586 14.2566 16.9162 14.3768C16.7001 14.438 16.6509 14.4519 16.4498 14.2074C16.2086 13.9194 16.0317 13.7331 15.6939 13.5636C14.6807 13.0384 13.6996 13.1909 12.7829 13.8178C11.6893 14.5632 11.1264 15.6644 11.1425 17.0367C11.1585 18.3921 12.0431 19.5103 13.3137 19.6966C14.4073 19.8491 15.324 19.4425 16.0477 18.5785C16.1924 18.3922 16.3212 18.1887 16.482 17.9516H13.378C13.0402 17.9516 12.9598 17.7314 13.0724 17.4433C13.2815 16.9181 13.6675 16.0372 13.8926 15.5967C13.9409 15.495 14.0535 15.3256 14.2947 15.3256H19.4702C19.7027 14.5496 20.0799 13.8164 20.5831 13.1226C21.7572 11.4961 23.1725 10.649 25.0863 10.2933C26.7268 9.9883 28.2707 10.1577 29.6699 11.1573C30.9405 12.0722 31.7285 13.3089 31.9376 14.9354C32.211 17.2225 31.5838 19.0862 30.0881 20.6787C29.0266 21.8138 27.7239 22.5254 26.2282 22.8473C25.9429 22.9029 25.6576 22.9293 25.3768 22.9553C25.2303 22.9689 25.085 22.9823 24.9416 22.9998C23.478 22.9659 22.1432 22.5254 21.0173 21.5089C20.2256 20.7879 19.6803 19.9019 19.4092 18.8705C19.2211 19.2707 18.9962 19.6539 18.7336 20.0185C17.5756 21.628 16.0638 22.6276 14.15 22.8987C12.5738 23.1189 11.1103 22.797 9.82366 21.7805C8.63353 20.8317 7.95805 19.578 7.78114 18.0194C7.57206 16.1727 8.08671 14.5124 9.14818 13.0554C10.2901 11.4798 11.8019 10.4802 13.6514 10.1244C15.1632 9.8364 16.6106 10.0228 17.9134 10.9546C18.7657 11.5475 19.3769 12.3608 19.779 13.3434C19.8755 13.4959 19.8111 13.5806 19.6181 13.6314C19.0545 13.7822 18.5903 13.9121 18.1177 14.0442ZM28.7581 15.974C28.7613 16.0309 28.7646 16.0909 28.7693 16.1552C28.6889 17.6122 27.9973 18.6965 26.7268 19.3911C25.8744 19.8485 24.9898 19.8994 24.1053 19.4928C22.9473 18.9506 22.3361 17.6122 22.6256 16.2907C22.9795 14.6982 23.9444 13.6986 25.4401 13.3428C26.968 12.9701 28.4316 13.9188 28.7211 15.5961C28.7438 15.7161 28.7505 15.836 28.7581 15.974Z"
									fill="#00ACD7"
								></path>
								<path
									d="M2.44461 13.8517C2.41244 13.9025 2.42852 13.9364 2.49285 13.9364L7.2826 13.9534C7.33085 13.9534 7.41126 13.9025 7.44343 13.8517L7.71684 13.4112C7.749 13.3604 7.73292 13.3096 7.66859 13.3096H2.95926C2.89493 13.3096 2.81451 13.3435 2.78235 13.3943L2.44461 13.8517Z"
									fill="#00ACD7"
								></path>
								<path
									d="M0.0160829 15.4103C-0.0160829 15.4611 7.45058e-09 15.495 0.0643316 15.495L6.63928 15.4781C6.70361 15.4781 6.76794 15.4442 6.78402 15.3764L6.91269 14.9698C6.92877 14.919 6.8966 14.8682 6.83227 14.8682H0.530735C0.466404 14.8682 0.385989 14.902 0.353823 14.9529L0.0160829 15.4103Z"
									fill="#00ACD7"
								></path>
								<path
									d="M3.90813 16.9521C3.87596 17.0029 3.89204 17.0537 3.95638 17.0537L6.43019 17.0707C6.47843 17.0707 6.54277 17.0199 6.54277 16.9521L6.57493 16.5455C6.57493 16.4777 6.54277 16.4269 6.47843 16.4269H4.29412C4.22978 16.4269 4.16545 16.4777 4.13329 16.5285L3.90813 16.9521Z"
									fill="#00ACD7"
								></path>
							</svg>
						</div>
					</div>

					<div className="flex items-center justify-center gap-2 mb-[38px]">
						<span className="text-gray-500 text-sm">
							Powered by
						</span>
						<a
							href="https://vercel.com/fluid"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors border-b border-gray-300 hover:border-gray-500 pb-0.5"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 196 196"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="transition-colors"
							>
								<g clip-path="url(#clip0_3776_3941)">
									<path
										d="M85.75 24.5H110.25V0H128.625V24.5H159.25C166.015 24.5 171.5 29.9845 171.5 36.75V67.375H196V85.75H171.5V110.25H196V128.625H171.5V159.25C171.5 165.91 166.186 171.328 159.566 171.496L159.25 171.5H128.625V196H110.25V171.5H85.75V196H67.375V171.5H36.75L36.4336 171.496C29.9195 171.331 24.6691 166.081 24.5039 159.566L24.5 159.25V128.625H0V110.25H24.5V85.75H0V67.375H24.5V36.75C24.5 29.9845 29.9845 24.5 36.75 24.5H67.375V0H85.75V24.5ZM90.5029 94.8457C86.5615 97.6177 83.1197 100.863 79.7314 104.377C75.1938 109.083 69.7904 115.423 64.0049 119.965C58.3084 124.437 51.5389 127.851 42.875 128.508V153.125H153.125V128.625H122.501C112.565 128.625 104.338 125.077 98.6211 119.074C93.0187 113.192 90.3447 105.496 90.3447 98C90.3447 96.9506 90.3974 95.8974 90.5029 94.8457ZM42.875 110.031C46.5573 109.486 49.5804 107.928 52.6582 105.512C57.1125 102.015 60.7061 97.6356 66.5039 91.623C71.9358 85.9899 78.5966 79.7937 87.7148 75.0947C96.9202 70.351 108.143 67.375 122.501 67.375V85.75C117.125 85.75 113.866 87.5619 111.927 89.5977C109.873 91.7542 108.72 94.7772 108.72 98C108.72 101.223 109.873 104.246 111.927 106.402C113.866 108.438 117.125 110.25 122.501 110.25H153.125V42.875H42.875V110.031Z"
										fill="currentColor"
									/>
								</g>
								<defs>
									<clipPath id="clip0_3776_3941">
										<rect
											width="196"
											height="196"
											fill="white"
										/>
									</clipPath>
								</defs>
							</svg>
							<span className="text-sm">Fluid compute</span>
						</a>
						<span className="text-gray-500 text-sm">&amp;</span>
						<a
							href="https://river.now/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-500 text-sm hover:text-gray-700 transition-colors border-b border-gray-300 hover:border-gray-500 pb-0.5"
						>
							River
						</a>
					</div>
				</div>

				{/* Info Tables */}
				<div className="space-y-4">
					{/* Runtime Information */}
					<div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
						<div className="bg-gray-800 text-white px-3 py-1.5">
							<h2 className="text-sm font-semibold">
								Runtime Information
							</h2>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-xs">
								<tbody>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700 w-1/3">
											Go Version
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.GoVersion}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Operating System
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.GOOS}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Architecture
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.GOARCH}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											CPU Cores
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.NumCPU}
										</td>
									</tr>
									<tr>
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											GOMAXPROCS
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.GOMAXPROCS}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Environment Variables */}
					{hasEnvVars && (
						<div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
							<div className="bg-gray-800 text-white px-3 py-1.5">
								<h2 className="text-sm font-semibold">
									Environment Variables
								</h2>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full text-xs">
									<tbody>
										{envEntries.map(
											([key, value], index) => (
												<tr
													key={key}
													className={
														index <
														envEntries.length - 1
															? "border-b border-gray-200"
															: ""
													}
												>
													<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700 w-1/3">
														{key}
													</td>
													<td className="px-3 py-1.5 text-gray-900 text-xs break-all">
														{value}
													</td>
												</tr>
											),
										)}
									</tbody>
								</table>
							</div>
						</div>
					)}

					{/* Memory Statistics */}
					<div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
						<div className="bg-gray-800 text-white px-3 py-1.5">
							<h2 className="text-sm font-semibold">
								Memory Statistics
							</h2>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-xs">
								<tbody>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700 w-1/3">
											Allocated Memory
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatBytes(goInfo.MemStats.Alloc)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Total Allocated
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatBytes(
												goInfo.MemStats.TotalAlloc,
											)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											System Memory
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatBytes(goInfo.MemStats.Sys)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Heap Allocated
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatBytes(
												goInfo.MemStats.HeapAlloc,
											)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Heap System
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatBytes(
												goInfo.MemStats.HeapSys,
											)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Heap Objects
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.MemStats.HeapObjects.toLocaleString()}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Stack Memory
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatBytes(
												goInfo.MemStats.StackInuse,
											)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Mallocs
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.MemStats.Mallocs.toLocaleString()}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Frees
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.MemStats.Frees.toLocaleString()}
										</td>
									</tr>
									<tr>
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											GC Runs
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.MemStats.NumGC}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Garbage Collector Statistics */}
					<div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
						<div className="bg-gray-800 text-white px-3 py-1.5">
							<h2 className="text-sm font-semibold">
								Garbage Collector
							</h2>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-xs">
								<tbody>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700 w-1/3">
											Next GC Target
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatBytes(
												goInfo.MemStats.NextGC,
											)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Last GC
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.MemStats.LastGC > 0
												? new Date(
														goInfo.MemStats.LastGC /
															1000000,
													).toLocaleString()
												: "Not yet run"}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Total Pause Time
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{formatNanoseconds(
												goInfo.MemStats.PauseTotalNs,
											)}
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											GC CPU Fraction
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{(
												goInfo.MemStats.GCCPUFraction *
												100
											).toFixed(3)}
											%
										</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											Forced GC
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.MemStats.NumForcedGC}
										</td>
									</tr>
									<tr>
										<td className="px-3 py-1.5 bg-gray-100 font-medium text-gray-700">
											GC Enabled
										</td>
										<td className="px-3 py-1.5 text-gray-900">
											{goInfo.MemStats.EnableGC
												? "Yes"
												: "No"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-8 pt-6 border-t border-gray-200">
					<p className="text-gray-500 text-xs">
						Go Runtime Information • Generated at{" "}
						{new Date().toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
}

function formatBytes(bytes: number) {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return (
		Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
	);
}

function formatNanoseconds(ns: number) {
	if (ns < 1000) return ns + " ns";
	if (ns < 1000000) return (ns / 1000).toFixed(2) + " μs";
	if (ns < 1000000000) return (ns / 1000000).toFixed(2) + " ms";
	return (ns / 1000000000).toFixed(2) + " s";
}
