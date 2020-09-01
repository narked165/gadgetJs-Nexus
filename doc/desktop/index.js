import Controller from './Controller.js'

const app = {
    events: {},
    on(type, Fn) {
        this.events[type]=this.event[type] || []
        this.events[type].push(Fn)
    },
    // If Event key of type map array values and call each; Else throw new Error
    emit(type, data) {
        this.events[type]
        ? this.events[type].map(event => event.apply(this, [data]))
        : console.error(new Error(`<i> TYPE-ERROR Event-Type: ${ type } not reistered.`))
    }
}
window.addEventListener('load', () => {

    Controller('backdrop', (backdrop) => {
        backdrop.src="./nexus.gif"
    })

    Controller('main', (main) => {

    })

    Controller('nav', (nav) => {

    })

    Controller('nav-logo', (navLogo) => {

    })

    Controller('logo-link', (logoLink) => {
        logoLink.href="#!/desktop"
    })

    Controller('logo-img', (logoImg) =>{
        logoImg.alt="uKhan! Logo"
        logoImg.src="khan2.png"
    })

    Controller('nav-tagline', (navTagline) => {
        navTagline.innerHTML = `<a>Unleash The Dog's of War!</a>`
    })

    Controller('nav-links', (navLinks) => {

    })

    Controller('nav-link-list', (navLinkList) => {

    })

    Controller('desktop', (desktop) => {
        desktop.user = {
            name: "",
            set guestName(guestName) {
                this.name = guestName && typeof guestName === 'string' && guestName.length > 0
                            ? guestName.slice(0,1).toUpperCase().concat(guestName.slice(1).toLowerCase())
                            : "Anonomous-Guest-User"
            },
            get guestName() {
                return this.userName
            }
        }
    })

    Controller('banner-globe', (bannerGlobe) => {

    })

    Controller('globe', (globe) => {
        globe.href = "https://fontawesome.com/license"
        globe.innerHTML = `<h1>UNDER CONSTRUCTION!</h1><i src="media/fa/svgs/solid/snowplow.svg" class="fas fa-snowplow" style="font-size: 77pt;"></i>`
        window.addEventListener('animationiteration', () => {
            document.querySelector('[data-app] i').style.transform = "rotateY(180deg)"
        })
    })

    Controller('app-left', (appLeft) => {

    })

    Controller('app-center', (appCenter) => {

    })

    Controller('app-right', (appRight) => {

    })

    Controller('info-slide', (infoSlide) => {

    })

//  ---------------- Test Prototype Controller imp ->

    Controller("go", (go) => {
        let _go_content = `Hork!`,
            _go_icon= `fa fas-cogs`
        go.innerHTML=`<span><h6>${ _go_content }</h6><i class="fas fa-cogs"></i></span>`
        go.addEventListener('click', () => {
            window.alert('Got coffe!')
        })
    })
// --------------------------- End Controllers -------------------------------------- >


    function Component(id, cln, atrb) {
        let _parentNode = document.querySelector('main'),
            _shadowElement = document.createElement('template')
        _shadowElement.id = id
        _shadowElement.className = cln
        _shadowElement.dataset.app = atrb
        _shadowElement.innerHTML= `
    <a data-app="button" onclick="this.style.color=coral;" href="#/nowhere">I am a custom Element</a>
    <output data-app="output"><slot name="output"</output>
`

        _parentNode.appendChild(_shaddowElement)
        shadowElement.prototype.pork = function() {
            console.log('pork')
        }

    }
    class WebCom extends HTMLElement {
        constructor() {
            super()
            this.attatchShadow({ node: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode())
            this.shadowRoot.querySelector('[data-app="output"]').innerText="Not-Pushed"
            this.shadowRoot.querySelector('[data-app="button"]').addEventListener('click', (e) => {
                document.shadowRoot.querySelector('[data-app="output"]').innerText="Pushed"
            })
            this.events = {}
            this.on = (type, Fn) => {
                this.events[type] = this.events[type] || []
                this.events[type].push(Fn)
            }
            this.emit = (type, data) => {
                this.events[type]
                ? this.events[type].map(evt => evt.apply(this, data))
                : console.error(new Error(`<!> [EVENT-TYPE-ERROR]  ::  Can not EMIT: ${ type }, Event-Type, Not Registered! <!>`))
            }
        }



        connectedCallback() {
            console.log('connected')
        }

        disconnectedCallback() {
            this.shadowRoot.querySelector('[data-app="button"]').removeEventListener()
        }

    }

})