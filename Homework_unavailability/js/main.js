addEventListener('contextmenu', e => e.preventDefault(), { capture: true })

addEventListener(
	'keydown',
	e => {
		const key = e.key
		const zoomCombo =
			(e.ctrlKey || e.metaKey) && ['+', '-', '0', '=', '_'].includes(key)
		if (['Tab', 'Escape', 'PageDown', 'PageUp'].includes(key) || zoomCombo) {
			e.preventDefault()
			e.stopPropagation()
		}
	},
	true
)

addEventListener('selectstart', e => e.preventDefault(), { capture: true })
;(function () {
	const ok = document.getElementById('cookieBtn')
	const bar = document.getElementById('cookie')
	if (!ok || !bar) return

	ok.addEventListener('mousedown', () => {
		bar.classList.add('hide')
	})
})()
;(function () {
	const f = document.getElementById('nvFooter')
	if (f && f.closest('#pane')) document.body.appendChild(f)

	const goPage = p => {
		if (p === 'home') window.location.href = 'index.html'
		if (p === 'lineup') window.location.href = 'lineup.html'
		if (p === 'tickets') window.location.href = 'tickets.html'
	}
	document.querySelectorAll('.nv-footer .link[data-page]').forEach(el => {
		el.addEventListener('mousedown', () => goPage(el.getAttribute('data-page')))
	})

	document.querySelectorAll('.nv-footer .link[data-href]').forEach(el => {
		el.addEventListener('mousedown', () => {
			const modal = document.getElementById('modal')
			const shade = document.getElementById('shade')
			const title = modal?.querySelector('.md-title')
			const sub = modal?.querySelector('.md-sub')
			if (modal && shade && title && sub) {
				title.textContent = el.textContent.trim()
				sub.textContent = 'Раздел в разработке'
				shade.style.display = 'block'
				modal.style.display = 'block'
			}
		})
	})

	document.querySelectorAll('.nv-footer .s.ic').forEach(el => {
		const url = el.getAttribute('data-ext')
		if (url) el.addEventListener('mousedown', () => window.open(url, '_blank'))
	})

	const up = document.getElementById('toTop')
	if (up) {
		up.addEventListener('mousedown', () => {
			if (typeof window.go === 'function') window.go(0)
			else window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}
})()
