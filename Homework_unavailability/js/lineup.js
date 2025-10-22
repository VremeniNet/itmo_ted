;(function () {
	const nav = document.querySelector('.nv-nav')
	if (!nav) return
	const go = p => {
		window.location.href = p
	}
	nav
		.querySelector('[data-page="home"]')
		?.addEventListener('mousedown', () => go('index.html'))
	nav
		.querySelector('[data-page="lineup"]')
		?.addEventListener('mousedown', () => go('lineup.html'))
	nav
		.querySelector('[data-page="tickets"]')
		?.addEventListener('mousedown', () => go('tickets.html'))
})()
;(function () {
	const shade = document.getElementById('shade')
	const modal = document.getElementById('modal')
	const title = document.getElementById('artistTitle')
	const sub = document.getElementById('artistSub')

	document.querySelectorAll('.artist').forEach(card => {
		card.addEventListener('mousedown', () => {
			const name = card.getAttribute('data-name') || 'Артист'
			title.textContent = name
			sub.textContent = 'Подробности скоро.'
			shade.style.display = 'block'
			modal.style.display = 'block'
		})
	})

	document.getElementById('closeModal')?.addEventListener('mousedown', () => {
		modal.style.display = 'none'
		shade.style.display = 'none'
	})
	document.getElementById('goModal')?.addEventListener('mousedown', () => {
		modal.style.display = 'none'
		shade.style.display = 'none'
	})
})()
