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
	const mdTitle = document.getElementById('mdTitle')
	const mdSub = document.getElementById('mdSub')

	document.querySelectorAll('.buy').forEach(btn => {
		btn.addEventListener('mousedown', () => {
			const tier = btn.getAttribute('data-tier') || 'Билет'
			mdTitle.textContent = `Оформление — ${tier}`
			mdSub.textContent = 'Введите email и нажмите «продолжить».'
			shade.style.display = 'block'
			modal.style.display = 'block'
		})
	})

	document.getElementById('heroBuy')?.addEventListener('mousedown', () => {
		mdTitle.textContent = 'Оформление — Абонемент'
		mdSub.textContent = 'Введите email и нажмите «продолжить».'
		shade.style.display = 'block'
		modal.style.display = 'block'
	})

	document.getElementById('closeModal')?.addEventListener('mousedown', () => {
		modal.style.display = 'none'
		shade.style.display = 'none'
	})
	document.getElementById('goModal')?.addEventListener('mousedown', () => {
		modal.style.display = 'none'
		shade.style.display = 'none'
		showToast('Заявка оформлена')
	})
})()
;(function () {
	const tip = document.getElementById('maptip2')
	document.querySelectorAll('.mapbox .pin').forEach(p => {
		p.addEventListener('mousedown', () => {
			tip.textContent = p.getAttribute('data-tip') || ''
		})
	})
})()

function showToast(text) {
	let toast = document.getElementById('toast')
	if (!toast) {
		toast = document.createElement('div')
		toast.id = 'toast'
		toast.className = 'toast'
		document.body.appendChild(toast)
	} else if (toast.closest('#pane')) {
		document.body.appendChild(toast)
	}
	toast.textContent = text || 'Готово'
	toast.classList.add('show')
	setTimeout(() => toast.classList.remove('show'), 5000)
}
