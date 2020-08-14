let obj = {
  __init() {
    obj.update();
    obj.createListeners();
    obj.closeTab();
    obj.bordeRed();
  },

  html:{
    get(element) {
      return document.querySelector(element);
    }
  },

  letter: "A",

  data:[],

  state:{
    page: 1,
    perPage: 3,
    totalPage: 0,
  },

  bordeRed() {
    window.addEventListener('click', () => {
      if(document.getElementById('quantify').value == "") {
        document.getElementById('quantify').classList.add("borderRed")
      } else {
        document.getElementById('quantify').classList.remove("borderRed")
      }
    })
  },

  closeTab() {
    let btnOpt = document.getElementById("optionButton")

    window.addEventListener('click', (event) => {
      if(!event.target.classList.contains("box") && event.target != btnOpt) {
        document.querySelector("#controlList .box").classList.remove("openTab")
      }
    });
  },

  openTab(){
    document.querySelector("#controlList .box").classList.toggle("openTab")
  },

  changeLetter(){
    let selectLetter = document.getElementById("letter");
    let optionLetter = selectLetter.options[selectLetter.selectedIndex].value;

    if(this.letter != optionLetter){
      this.letter = optionLetter
      obj.quantifyList()
    }
  },

  quantifyList() {
    let select = document.getElementById("quantify");
    let option = select.options[select.selectedIndex].value;
    this.data = []
    this.html.get('.list').innerHTML = ""
    
    for (let i = 0; i < option; i++) {
      this.data.push(`<div>Item ${this.letter}${i + 1}</div>`)
      const list = this.html.get('#paginate .list')
      list.innerHTML = this.data.join("")
    }
    
    this.state.page = 1
    this.state.perPage = 3
    this.state.totalPage = Math.ceil( option / this.state.perPage)
    obj.update();
  },

  create(item) {
    const div = document.createElement('div')
    div.classList.add('item')
    div.innerHTML = item

    document.querySelector('.list').appendChild(div)
  },

  update() {
    this.html.get('.list').innerHTML = ""

    let page = this.state.page - 1
    let start = page * this.state.perPage
    let end = start + this.state.perPage

    const paginatedItems = this.data.slice(start, end)

    paginatedItems.forEach(obj.create)
  },

  next() {
    this.state.page++

    if(this.state.page > this.state.totalPage) {
      this.state.page--
    }
  },

  prev() {
    this.state.page--

    if(this.state.page < 1){
      this.state.page++
    }
  },

  createListeners() {
    this.html.get('.next').addEventListener('click', () => {
      obj.next()
      obj.update()
    }),
    this.html.get('.prev').addEventListener('click', () => {
      obj.prev()
      obj.update()
    })
  }

}

obj.__init()
