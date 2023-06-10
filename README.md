# README - Controle Financeiro
### Este é o README do projeto de Controle Financeiro. Nele, você encontrará informações sobre as rotas, parâmetros e requisitos da API.

## Cadastro
 O usuário deve ser capaz de criar uma conta na tela de rota /cadastro.
 Através de uma requisição POST, realize o cadastro do usuário no banco de dados.
 Todos os campos são obrigatórios. Faça validações de acordo com a necessidade no front e no back que garantam que todos os dados estejam presentes.
 O e-mail deve ter um formato válido. Caso não possua, a requisição deve retornar o status code 422 (Unprocessable Entity)e o front-end deve mostrar uma mensagem explicando o erro.
 A senha deve possuir no mínimo três caracteres. Caso não possua, a requisição deve retornar status 422 (Unprocessable Entity)e o front-end deve mostrar uma mensagem explicando o erro.
 Caso já exista um usuário com este e-mail cadastrado, a requisição deve retornar status code 409 (Conflict) e o front-end deve mostrar uma mensagem explicando o erro.
 Caso algum dos campos não esteja presente ou esteja em um formato inválido, a requisição deve retornar status code 422 (Unprocessable Entity) e o front-end deve mostrar uma mensagem explicando.
 Em caso de sucesso, a requisição deve retornar status 201 (Created).
 Caso as senhas inseridas nos campos de senha e confirme senha não sejam iguais, a requisição não deve ser feita. Valide no front-end se esses valores são iguais e, somente então, envie sua requisição para a API (não é necessário enviar a senha duas vezes).
 Realize a criptografia da senha do usuário para guardá-la no banco de dados.
## Login
 O usuário deve ser capaz de entrar na aplicação na tela de rota /.
 Através de uma requisição POST, realize o login do usuário.
 Todos os campos são obrigatórios. Faça validações de acordo com a necessidade no front e no back que garantam que todos os dados estejam presentes.
 O e-mail deve ter um formato válido. Caso não possua, a requisição deve retornar o status code 422 (Unprocessable Entity) e o front-end deve mostrar uma mensagem explicando o erro.
 Caso o e-mail de login não esteja cadastrado, a requisição deve retornar status code 404 (Not Found) e o front-end deve mostrar uma mensagem explicando o erro.
 Caso a senha enviada não seja correspondente com a que está cadastrada, a requisição deve retornar status code 401 (Unauthorized) e o front-end deve mostrar uma mensagem explicando o erro.
 Em caso de sucesso no login (e-mail e senha corretos), a requisição deve retornar status code 200 (OK) e um token. O usuário deve ser redirecionado para a rota /home.
 Para manter o usuário logado, utilize o local storage.
## Adicionar operações de entrada e saída
 O usuário deve ser capaz de adicionar transações do tipo entrada ou saida na aplicação, na tela de rota /nova-transacao/:tipo.
 Adicionar uma transação com endpoints do tipo POST.
 Essa rota deve receber o token de autorização do usuário. Caso não receba, deve enviar o status 401 (Unauthorized).
 O tipo de dado do valor deve ser flutuante (ex: 40.5) e positivo.
 Todos os campos são obrigatórios. Faça validações de acordo com a necessidade no front-end e no back-end que garantam que todos os dados estejam presentes.
 Caso algum dado seja enviado à API em formato inválido, a resposta à requisição deve possuir o status 422 (Unprocessable Entity) e o front-end deve exibir uma mensagem explicativa ao usuário.
## Listagem de operações
 Na tela /home, o usuário deve ser capaz de ver todas as suas transações realizadas até então. A requisição deve ser feita através de uma rota do tipo GET.
 Essa rota deve receber o token de autorização do usuário. Caso não receba, deve enviar o status code 401 (Unauthorized).
 Caso o limite de espaço da tela não seja suficiente para visualizar tudo, deve haver um scroll apenas nas transações, o saldo deve ser mantido fixo onde está.
 O nome do usuário deve ser exibido no topo da tela.
 As entradas e saídas devem aparecer de acordo com a data, sendo a mais recente a primeira da lista.
 Os valores de entradas devem ser exibidos em verde e os valores de saída, em vermelho.
 O saldo final do usuário deve ser exibido, levando em consideração a soma de todas as entradas e saídas.
 Se o saldo for positivo, deve estar em verde. Se for negativo, deve estar em vermelho.
## Logout
 Ao clicar no botão de logout, o usuário deve ser deslogado e então redirecionado para a tela de login.
 O usuário NÃO deve ser capaz de acessar as rotas /home ou /nova-transacao sem estar logado. Ao tentar acessar essas páginas, deve ser redirecionado para a tela de login.
 Após fazer o logout, o usuário deve ser capaz de conseguir fazer login normalmente.
