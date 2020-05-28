const form = document.getElementById('form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formdata = new FormData(form);
  const body = formdata.get('message-input');
  if(body){
    const picture = localStorage.getItem('picture');
    axios.post('api/messages', { body, username, picture })
    .then(res => {
      appendMessages([res.data]);
      form.reset();
    })
    .catch(err => console.error(err))
  }
})