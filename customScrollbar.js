/**
 * @module customScrollbar
 * 
 */

function customScollbar(){		
	const isTouch = 'ontouchstart' in document.documentElement;
	const scroller = document.querySelector('.customScrollbar');
	const content = scroller.querySelector('.customScrollbar-content');
	const scrollbar = scroller.querySelector('.customScrollbar-scrollbar');
	let ratio;
	let posY = 0;	
	let offset = 0;
	let scrollbar_top = parseInt(getComputedStyle(scrollbar).top);
	
	
	if(isTouch){
		scrollbar.style.pointerEvents = 'none';
		scroller.ontouchstart = () => scroller.classList.add('onscroll');
		scroller.ontouchend = () => scroller.classList.remove('onscroll');
	}
	const resize = () => {
		ratio = content.clientHeight / content.scrollHeight;
		scrollbar.style.height = `${content.clientHeight * ratio - 2 * scrollbar_top}px`;
	}
	const mouseMove = e => {
		posY = e.clientY - offset;
		content.scrollTo(0, posY / ratio)
	};
	const mouseUp = () => {
		scroller.classList.remove('onscroll');
		window.removeEventListener('mousemove', mouseMove)
		window.removeEventListener('mouseup', mouseUp)
	};
	const mouseDown = val => {
		scroller.classList.add('onscroll');
		offset = val - posY;
		window.addEventListener('mousemove', mouseMove)
		window.addEventListener('mouseup', mouseUp)
		return false;
	}
	scrollbar.onmousedown = e => mouseDown(e.clientY);
	content.onscroll = () => {
		posY = content.scrollTop * ratio;
		scrollbar.style.top = `${posY + scrollbar_top}px`;
	};
	
	window.addEventListener('resize',resize, {passive: true});
	resize();
}


export default customScollbar;
