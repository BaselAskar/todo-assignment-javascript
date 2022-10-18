//Id secquencer
let currentId = 0;



class TodoItem {
  #id;
  #content;
  #done;

  constructor(content){
    this.#id = ++currentId;
    this.#content = content;
    this.#done = false;
  }

  get id() {
    return this.#id
  }

  get content(){
    return this.#content;
  }

  get done(){
    return this.#done;
  }

  set done(value){
    if (typeof(value) !== 'boolean'){
      console.error('the value has to be boolean');
      return;
    }

    this.#done = value;
  }

}

export default TodoItem;