const STORAGE_KEY = 'todo-app-data';

function loadTodos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  const todos = loadTodos();

  document.querySelectorAll('.todo-list').forEach(list => {
    list.innerHTML = '';
  });

  todos.forEach((todo, index) => {
    const categoryEl = document.querySelector(`.category[data-category="${todo.category}"] .todo-list`);
    if (categoryEl) {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';
      li.innerHTML = `
        <label>
          <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}" />
          <span>${todo.text}</span>
        </label>
        <button class="delete-btn" data-index="${index}">&times;</button>
      `;
      categoryEl.appendChild(li);
    }
  });
}

function addTodo(text, category) {
  const todos = loadTodos();
  todos.push({ text, category, completed: false });
  saveTodos(todos);
  renderTodos();
}

function toggleTodo(index) {
  const todos = loadTodos();
  todos[index].completed = !todos[index].completed;
  saveTodos(todos);
  renderTodos();
}

function deleteTodo(index) {
  const todos = loadTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}

document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const select = document.getElementById('category-select');

  if (input.value.trim()) {
    addTodo(input.value.trim(), select.value);
    input.value = '';
  }
});

document.getElementById('categories').addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    toggleTodo(parseInt(e.target.dataset.index));
  }
});

document.getElementById('categories').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteTodo(parseInt(e.target.dataset.index));
  }
});

renderTodos();
