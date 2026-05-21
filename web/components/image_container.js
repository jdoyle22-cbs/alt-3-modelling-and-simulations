class ImageContainer extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./main.css" />
            <div class="img">
                <div class="img_container">
                    <img class="background" src=${this.getAttribute("src")} />
                    <img class="front_image" src=${this.getAttribute("src")} />
                </div>
                <p>${this.getAttribute("caption") ?? ""}</p>
            </div>
        `
    }
}

customElements.define("image-container", ImageContainer);