let username = localStorage.getItem('username');
if(!username){
  username = prompt("Please enter your name");
  localStorage.setItem('username', username);
  axios.get('https://randomuser.me/api')
  .then(res => {
    const picture = res.data.results[0].picture.thumbnail
    localStorage.setItem('picture', picture);
  })
  .catch(err => {
    console.error(err); 
  })
}