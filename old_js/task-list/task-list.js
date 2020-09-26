class TaskList extends HTMLElement {
  constructor() {
    super();
    let tasks = [];

    const style = `
        * {
          font-size: 200%;
        }
  
        span {
          width: 4rem;
          display: inline-block;
          text-align: center;
        }
  
        button {
          width: 64px;
          height: 64px;
          border: none;
          border-radius: 10px;
          background-color: seagreen;
          color: white;
        }
    `;

    const html = `
        <ul class="list">
        ${tasks}
            <li>Blop</li>
        </ul>
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${style}
      </style>
      ${html}
    `;

    this.buttonInc = this.shadowRoot.getElementById('inc');
    this.buttonDec = this.shadowRoot.getElementById('dec');
    this.spanValue = this.shadowRoot.querySelector('span');

    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
  }

  inc() {
    this.count += 1;
    this.update();
  }

  dec() {
    this.count -= 1;
    this.update();
  }

  update() {
    this.spanValue.innerText = this.count;
  }

  connectedCallback() {
    this.buttonInc.addEventListener('click', this.inc);
    this.buttonDec.addEventListener('click', this.dec);
  }

  disconnectedCallback() {
    this.buttonInc.removeEventListener('click', this.inc);
    this.buttonDec.removeEventListener('click', this.dec);
  }
}

customElements.define('task-list', TaskList);
