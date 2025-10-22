const pane = document.getElementById('pane')
const sections = Array.from(document.querySelectorAll('.section'))
let index = 0
let isScrolling = false
function go(i) {
	index = Math.max(0, Math.min(sections.length - 1, i))
	pane.style.transform = `translateY(${-index * 100}vh)`
}
addEventListener(
	'wheel',
	e => {
		if (isScrolling) return
		isScrolling = true
		go(index + (e.deltaY > 0 ? 1 : -1))
		setTimeout(() => (isScrolling = false), 800)
	},
	{ passive: false }
)
;(function () {
	const nav = document.querySelector('.nv-nav')
	if (!nav) return

	nav.querySelector('[data-page="home"]')?.addEventListener('mousedown', () => {
		if (typeof go === 'function') go(0)
	})

	nav
		.querySelector('[data-page="lineup"]')
		?.addEventListener('mousedown', () => {
			window.location.href = 'lineup.html'
		})

	nav
		.querySelector('[data-page="tickets"]')
		?.addEventListener('mousedown', () => {
			window.location.href = 'tickets.html'
		})
})()

document.querySelector('.enter').addEventListener('mousedown', () => go(1))

const shade = document.getElementById('shade')
const modal = document.getElementById('modal')
const cookie = document.getElementById('cookie')

setTimeout(() => {
	shade.style.display = 'block'
	modal.style.display = 'block'
}, 1200)

document.getElementById('closeModal').addEventListener('mousedown', () => {
	modal.style.display = 'none'
	shade.style.display = 'none'
})
document.getElementById('goModal').addEventListener('mousedown', () => {
	modal.style.display = 'none'
	shade.style.display = 'none'
})

document.getElementById('cookieBtn').addEventListener('mousedown', () => {
	cookie.style.transform = 'translateY(60px)'
})

const fs = document.querySelector('.fake-select')
const dd = document.querySelector('.fake-dd')
if (fs && dd) {
	fs.addEventListener('mousedown', () => {
		dd.style.display = dd.style.display === 'block' ? 'none' : 'block'
	})
	dd.querySelectorAll('li').forEach(li => {
		li.addEventListener('mousedown', () => {
			fs.querySelector('span').textContent = li.textContent
			dd.style.display = 'none'
		})
	})
}

const scroller = document.getElementById('headliners')
if (scroller) {
	setInterval(() => {
		const atEnd =
			Math.ceil(scroller.scrollLeft + scroller.clientWidth) >=
			scroller.scrollWidth
		if (atEnd) {
			scroller.scrollTo({ left: 0, behavior: 'smooth' })
		} else {
			scroller.scrollBy({ left: 280, behavior: 'smooth' })
		}
	}, 1800)
}

const tip = document.getElementById('maptip')
document.querySelectorAll('.mapbox .pin').forEach(p => {
	p.addEventListener('mousedown', () => {
		tip.textContent = p.getAttribute('data-tip') || ''
	})
})

setTimeout(() => {
	const a = document.getElementById('bgAudio')
	if (a) {
		a.muted = false
		a.volume = 1
	}
}, 1000)

go(0)
const newsScroller = document.getElementById('newsrow')
if (newsScroller) {
	let dir = 1
	setInterval(() => {
		if (newsScroller.scrollWidth <= newsScroller.clientWidth) return
		const atEnd =
			Math.ceil(newsScroller.scrollLeft + newsScroller.clientWidth) >=
			newsScroller.scrollWidth - 2
		const atStart = newsScroller.scrollLeft <= 0
		if (atEnd) dir = -1
		if (atStart) dir = 1
		newsScroller.scrollBy({ left: dir * 320, behavior: 'smooth' })
	}, 1800)
}
const goBtn = document.getElementById('goModal')
const emailInput = document.getElementById('presaleEmail')
const msg = document.querySelector('#modal .md-sub')

goBtn.addEventListener('mousedown', () => {
	const val = (emailInput?.value || '').trim()
	if (!val || !val.includes('@')) {
		msg.classList.add('error')
		msg.textContent = 'Введите корректный email'
		return
	}
	document.getElementById('modal').classList.add('loading')
	msg.classList.remove('error')
	msg.textContent = 'Обработка...'

	setTimeout(() => {
		document.getElementById('modal').style.display = 'none'
		document.getElementById('shade').style.display = 'none'
		if (typeof go === 'function') go(4)
	}, 700)
})

emailInput?.addEventListener('keydown', e => {
	if (e.key === 'Enter') goBtn.dispatchEvent(new MouseEvent('mousedown'))
})
;(function () {
	const buy = document.querySelector('.buy')
	if (!buy) return

	let toast = document.getElementById('toast')
	if (!toast) {
		toast = document.createElement('div')
		toast.id = 'toast'
		toast.className = 'toast'
		document.body.appendChild(toast)
	} else if (toast.closest('#pane')) {
		document.body.appendChild(toast)
	}

	buy.addEventListener('mousedown', () => {
		toast.textContent = 'Заявка оформлена'
		toast.classList.add('show')
		setTimeout(() => toast.classList.remove('show'), 3000)
	})
})()
