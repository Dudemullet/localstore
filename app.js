window.app = (function() {
  var $form = $("#newTodo");
  var form = $form.get(0);
  var privateCheckbox = $("#todo-checkbox");
  var public = [], private = [];
  var todoTemplate = Handlebars.compile($("#todoTemplate").html());

  var isPrivate = function(){
    return privateCheckbox.get(0).checked;
  };

  var clearCompleted = function() {
    var $privateTodos = $("#privateTodos");
    var $publicTodos = $("#publicTodos");

    public = public.filter(function(v) {
      return !v.done;
    });
    private = private.filter(function(v) {
      return !v.done;
    });

    $privateTodos.empty();
    $publicTodos.empty()
    displayTodo.call($publicTodos, public);
    displayTodo.call($privateTodos, private);
    storage.savePrivate(private);
    storage.savePublic(public);
  }

  var todo_rdy = function(e) {
    var todoTxt = $("#todo-txt").val();
    var todo = {text: todoTxt, done: false};
    saveTodo(todo);
    appendTodo(todo);
    form.reset();
  }

  var saveTodo = function(todo) {
    if(isPrivate()) {
      private.push(todo);
      storage.savePrivate(private);
    } else {
      public.push(todo);
      storage.savePublic(public);
    }
  }

  var appendTodo = function(todo) {
    var tempArr = [todo];

    if(isPrivate()) {
      displayTodo.call($("#privateTodos"), tempArr);
    } else {
      displayTodo.call($("#publicTodos"), tempArr);
    }
  }

  var loadTodos = function() {
    public = storage.getPublic() || [];
    private = storage.getPrivate() || [];
  }

  var displayTodo = function(todoList) {
    todoList.map(function(v,i){
      v["index"] = i;
      return v;
    });
    var todos = todoTemplate({todos:todoList});
    this.append(todos);
  }

  var checkbox_toggle = function(e) {
    var checked = e.target.checked;
    var $checkbox = $(e.target);
    var $list = $(e.delegateTarget);
    var array = $list.data("type");
    var index = $checkbox.data("index");
    $checkbox.parent().toggleClass("finished", !!checked);
    if(array === "private") {
      private[index].done = checked;
      storage.savePrivate(private);
    } else {
      public[index].done = checked;
      storage.savePublic(public);
    }
  }

  var init = function() {
    $("#todo-save").on("click", todo_rdy);
    $("#clearBtn").on("click", clearCompleted);
    $("#privateTodos").on("click", ".todo-checkbox", checkbox_toggle);
    $("#publicTodos").on("click", ".todo-checkbox", checkbox_toggle);
    loadTodos();
    displayTodo.call($("#publicTodos"), public);
    displayTodo.call($("#privateTodos"), private);
  }

  return  {
    init: init
  }
})();
