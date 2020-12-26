# Quengas

## Aplicativo para divulgar perfís de prostitutas

**Projeto para a displina de Dispositivos Móveis - TADS 7v**

O projeto consiste em uma plataforma onde prostitutas podem criar anúncios
para divulgar seus trabalhos e ecncontrar intereçados.

### Tecnologias utilizadas

- React native
- Expo
- Firebase
  -- Authentication
  -- Cloud Firestore
  -- Storage

### Serviços

- Registro de prostitutas;
- Validação de e-mail;
- Validação de senhas;
- Recapcha de verificação;
- Confirmação de perfil por SMS;
- Login;
- Editar dados de perfil;
- Registrar anúncios no firebase;
- Listar anúncios de uma prostituta específica;
- Editar anúncios de uma prostituta específica;
- Listar anúncios;
- Filtrar anúncio por categoria;
- Buscar anúncio;
- marketplace;
- Enviar mensagem pelo whatsapp;

### Instruções

- Na tela inicial do app, você tem a opção
  de fazer login ou criar uma nova conta. Para seu
  primeiro acesso, você deve clicar em **Criar conta**

  ![inicial](/assets/telas/1.png)

- Na tela de criar conta preencha os campos de E-mail, Senha e Confirmar Senha,
  após isso, clicar em **CRIAR CONTA**

  ![criar-conta](/assets/telas/2.png)

- Na próxima tela você deve inserir seu número de telefone para confirmação por SMS,
  insira o número (--) --------- e clique em **Confirmar Número**

  ![confirmar-número](/assets/telas/3.png)

- Será exibido uma recapcha de verificação, para confirmar
  que não existe um robô corrigindo meu projeto.
  Após a verificação será enviado um código de confirmação, porém,
  defini um código padrão **123456** por equnato, esse código deve ser inserido
  nos campos que aparecem na tela. Após isso você está autenticado no sistema.
  Você é direcionado para a página que corresponde ao marketplace.

  ![marketplace](/assets/telas/4.png)

- Vá até o menu **Conta** e insira uma foto no seu perfil.
  Caso opte por editar o seu e-mail, a recapcha de verificação será exigida novamente,
  insira também seu nome!! Clique no ícone de lápis e depois no ícone de disquete para salvar

  ![conta](/assets/telas/5.png)

- Caso queira ser Quenga, você deve criar anúncios. Clique no ícone de mercado no centro da tela. Na tela **Meus Anúncios** clique o ícone **+** para adcionar um novo anúncio.

  ![meus-anuncios](/assets/telas/6.png)

- Preencha os campos e clique em **Adcionar novo anúncio**. Você deve inserir ao menos uma
  imagem e no máximo 5 imagens. Após o cadastro você é direcionado para a tela de **Meus Anúncios**

  ![meus-anuncios](/assets/telas/7.png)

- Na tela de **Anúncios** você encontra todos os anúncios cadastrados. Você pode filtrar por
  categori ou direto na barra de busca.

![meus-anuncios](/assets/telas/8.png)

- Clique no anúncio para obter detalhes. Caso queira entrar em contato com a dona do anúncio
  basta clicar no ícone de whatsapp.

![meus-anuncios](/assets/telas/9.png)
![meus-anuncios](/assets/telas/10.png)

- Logout fica lá na tela **Conta**

** App desenvolvido por Moisés Costa Lins **
