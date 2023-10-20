class Carousel{constructor(element,options={}){console.log("Hello World")
this.element=element
this.options=Object.assign({},{slidesToScroll:1,slidesVisible:1,loop:!1,pagination:!1,navigation:!0,infinite:!1},options)
let children=[].slice.call(element.children)
this.isMobile=!1
this.currentItem=0
this.moveCallbacks=[]
this.offset=0
this.root=this.createDivWithClass('carousel')
this.container=this.createDivWithClass('carousel__container')
this.root.setAttribute('tabindex','0')
this.root.appendChild(this.container)
this.element.appendChild(this.root)
this.items=children.map((child)=>{let item=this.createDivWithClass('carousel__item')
item.appendChild(child)
return item})
console.log(this.items.slice(1,-1))
if(this.options.infinite){this.offset=this.options.slidesVisible*2-1
this.items=[...this.items.slice(this.items.length-this.offset).map(item=>item.cloneNode(!0)),...this.items,...this.items.slice(0,this.offset).map(item=>item.cloneNode(!0)),]
console.log(this.items)
this.gotoItem(this.offset,!1)}
this.items.forEach(item=>this.container.appendChild(item))
this.setStyle()
if(this.options.navigation){this.createNavigation()}
if(this.options.pagination){this.createPagination()}
this.moveCallbacks.forEach(cb=>cb(this.currentItem))
this.onWindowResize()
window.addEventListener('resize',this.onWindowResize.bind(this))
this.root.addEventListener('keyup',(e)=>{if(e.key==='ArrowRight'){this.next()}else if(e.key==='ArrowLeft'){this.prev()}})
if(this.options.infinite){this.container.addEventListener('transitionend',this.resetInfinite.bind(this))}}
setStyle(){let ratio=this.items.length/this.slidesVisible
this.container.style.width=(ratio*100)+"%"
this.items.forEach(item=>item.style.width=((100/this.slidesVisible)/ratio)+"%")}
createNavigation(){let nextButton=this.createDivWithClass('carousel__next')
let prevButton=this.createDivWithClass('carousel__prev')
this.root.appendChild(nextButton)
this.root.appendChild(prevButton)
nextButton.addEventListener('click',this.next.bind(this))
prevButton.addEventListener('click',this.prev.bind(this))
if(this.options.loop===!0){return}
this.onMove(index=>{if(index===0){prevButton.classList.add('carousel__prev--hidden')}else{prevButton.classList.remove('carousel__prev--hidden')}
if(this.items[this.currentItem+this.slidesVisible]===undefined){nextButton.classList.add('carousel__next--hidden')}else{nextButton.classList.remove('carousel__next--hidden')}})}
createPagination(){let pagination=this.createDivWithClass('carousel__pagination')
let buttons=[]
this.root.appendChild(pagination)
for(let i=0;i<(this.items.length-2*this.offset);i=i+this.options.slidesToScroll){let button=this.createDivWithClass('carousel__pagination__button')
button.addEventListener('click',()=>this.gotoItem(i+this.offset))
pagination.appendChild(button)
buttons.push(button)}
this.onMove(index=>{let count=this.items.length-2*this.offset
let activeButton=buttons[Math.floor((index-this.offset)%count/this.options.slidesToScroll)]
if(activeButton){buttons.forEach(button=>button.classList.remove('carousel__pagination__button--active'))
activeButton.classList.add('carousel__pagination__button--active')}})}
next(){this.gotoItem(this.currentItem+this.slidesToScroll)}
prev(){this.gotoItem(this.currentItem-this.slidesToScroll)}
gotoItem(index,animation=!0){if(index<0){index=this.items.length-this.options.slidesVisible}else if(index>=this.items.length||this.items[this.currentItem+this.options.slidesVisible]===undefined&&index>this.currentItem){index=0}
let translatex=index*-100/this.items.length
if(animation===!1){this.container.style.transition='none'}
this.container.style.transform='translate3d('+translatex+'%,0,0)'
this.container.offsetHeight
if(animation===!1){this.container.style.transition=''}
this.currentItem=index
this.moveCallbacks.forEach(cb=>cb(index))}
resetInfinite(){if(this.currentItem<=this.options.slidesToScroll){this.gotoItem(this.currentItem+this.items.length-2*this.offset,!1)}else if(this.currentItem>=this.items.length-this.offset){this.gotoItem(this.currentItem-(this.items.length-2*this.offset),!1)}}
onMove(cb){this.moveCallbacks.push(cb)}
onWindowResize(){let mobile=window.innerWidth<800
if(mobile!=this.isMobile){this.isMobile=mobile
this.setStyle()
this.moveCallbacks.forEach(cb=>cb(this.currentItem))}}
createDivWithClass(className){let div=document.createElement('div')
div.setAttribute('class',className)
return div}
get slidesToScroll(){return this.isMobile?1:this.options.slidesToScroll}
get slidesVisible(){return this.isMobile?1:this.options.slidesVisible}}
document.addEventListener('DOMContentLoaded',function(){new Carousel(document.querySelector('#carousel1'),{slidesToScroll:1,slidesVisible:1,loop:!1,pagination:!0,infinite:!0})})
filterSelection("all")
function filterSelection(c){let x,i
x=document.getElementsByClassName('column')
if(c=="all")c=""
for(i=0;i<x.length;i++){w3RemoveClass(x[i],"show")
if(x[i].className.indexOf(c)>-1)w3AddClass(x[i],"show")}}
function w3AddClass(element,name){var i;let arr1=element.className.split(" ");let arr2=name.split(" ");for(i=0;i<arr2.length;i++){if(arr1.indexOf(arr2[i])==-1){element.className+=" "+arr2[i]}}}
function w3RemoveClass(element,name){var i,arr1,arr2;arr1=element.className.split(" ");arr2=name.split(" ");for(i=0;i<arr2.length;i++){while(arr1.indexOf(arr2[i])>-1){arr1.splice(arr1.indexOf(arr2[i]),1)}}
element.className=arr1.join(" ")}
var btnContainer=document.getElementById("myBtnContainer");let btns=document.querySelectorAll(".btn")
for(var i=0;i<btns.length;i++){btns[i].addEventListener("click",function(){var current=document.getElementsByClassName("active");current[0].className=current[0].className.replace(" active","");this.className+=" active"})}
class Lightbox{static init(){const links=Array.from(document.querySelectorAll('a[href$=".webp"]'))
const gallery=links.map(link=>link.getAttribute('href'))
links.forEach(link=>link.addEventListener('click',e=>{e.preventDefault()
new Lightbox(e.currentTarget.getAttribute('href'),gallery)}))}
constructor(url,images){this.element=this.buildDOM(url)
this.loadImage(url)
this.images=images
document.body.appendChild(this.element)
this.onKeyup=this.onKeyup.bind(this)
document.addEventListener('keyup',this.onKeyup)}
loadImage(url){this.url=null
const image=new Image()
const container=this.element.querySelector('.lightbox__container')
const loader=document.createElement('div')
loader.classList.add('lightbox__loader')
container.innerHTML=''
container.appendChild(loader)
image.onload=()=>{container.removeChild(loader)
container.appendChild(image)
this.url=url}
image.src=url}
onKeyup(e){if(e.key==='Escape'){this.close(e)}else if(e.key==='ArrowLeft'){this.prev(e)}else if(e.key==='ArrowRight'){this.next(e)}}
close(e){e.preventDefault()
this.element.classList.add('fadeOut')
window.setTimeout(()=>{this.element.parentElement.removeChild(this.element)})
document.removeEventListener('keyup',this.onKeyUp)}
next(e){e.preventDefault()
let i=this.images.findIndex(image=>image===this.url)
if(i==this.images.length-1){i=-1}
this.loadImage(this.images[i+1])}
prev(e){e.preventDefault()
let i=this.images.findIndex(image=>image===this.url)
if(i===0){i=this.images.length}
this.loadImage(this.images[i-1])}
buildDOM(url){const dom=document.createElement('div')
dom.classList.add('lightbox')
dom.innerHTML=`<button class="lightbox__close"></button>
		                <button class="lightbox__next"></button>
		                <button class="lightbox__prev"></button>
		                <div class="lightbox__container">
			                <img src="${url}" alt="">
		                </div> `
dom.querySelector('.lightbox__close').addEventListener('click',this.close.bind(this))
dom.querySelector('.lightbox__next').addEventListener('click',this.next.bind(this))
dom.querySelector('.lightbox__prev').addEventListener('click',this.prev.bind(this))
return dom}}
Lightbox.init()