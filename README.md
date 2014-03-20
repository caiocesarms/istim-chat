# IstimChatAPI
==============

### A chat API that supply communication between Istim's users for experience exchange
### API REST que provê a estrutura de um live chat

## Fucionalidades
=================

### Listar Usuários
  - http://localhost:1337/users/

### Inserir Usuários
  - http://localhost:1337/users/create?username=username&password=123&status=offline

### Remover usuários
  - http://localhost:1337/users/destroy/idUser

### Adcionar um amigo à lista de um usuário
  - http://localhost:1337/addFriend?username=username&newfriend=usernameFriend

### Acesso a lista de amigos pelo nome de usuário
  - http://localhost:1337/getFriends?username=username

### Saber se usuário está online
  - http://localhost:1337/getStatus?username=username

### Alterar o estatus de um usuário
  - http://localhost:1337/setStatus?username=username&status=online
