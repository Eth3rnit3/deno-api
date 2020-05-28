const messageCard = (message) => {
  const node = document.createElement("DIV");
  node.classList.add('message-card');
  const userMessage = message.username || 'anon';
  const textnode = document.createTextNode(message.body);
  if(userMessage === username){
    node.classList.add('is-me');
  }
  if(message.picture){
    const div = document.createElement("DIV");
    const img = document.createElement("IMG");
    img.src = message.picture;
    div.appendChild(img);
    div.appendChild(document.createTextNode(userMessage));
    node.appendChild(div);   
  } else {
    node.appendChild(document.createTextNode(`${userMessage} : `));
  }
  node.appendChild(textnode);
  return node;
}

const appendMessages = (messages = []) => {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = "";
  messages.forEach((message) => messagesContainer.appendChild(messageCard(message)))
}

const fetchMessages = () => {
  axios.get('api/messages')
  .then(res => appendMessages(res.data))
  .catch(err => console.error(err))
}

fetchMessages();