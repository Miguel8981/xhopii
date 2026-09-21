const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));

const clientes = [];
const funcionarios = [];
const produtos = [
    {
        nome: 'Camisa Desenvolvedor Front-End CSS',
        fabricante: 'Eletiva Uniformes',
        descricao: 'Uma Camisa ideal para programar por mais de 12 horas',
        valor: 'R$ 59,90',
        quantidade: '171',
        imagem: '/img/produto1.png'
    },
    {
        nome: 'Camisa Desenvolvedor Front-End HTML',
        fabricante: 'Eletiva Uniformes',
        descricao: 'Uma camisa para quem cria páginas com muito estilo',
        valor: 'R$ 59,90',
        quantidade: '120',
        imagem: '/img/produto2.png'
    },
    {
        nome: 'Camisa Desenvolvedor JavaScript',
        fabricante: 'Eletiva Uniformes',
        descricao: 'Perfeita para debugar com conforto',
        valor: 'R$ 64,90',
        quantidade: '98',
        imagem: '/img/produto3.png'
    }
];

const formatarMoeda = (valor) => {
    if (!valor) {
        return 'R$ 0,00';
    }

    return valor.trim().startsWith('R$') ? valor.trim() : `R$ ${valor.trim()}`;
};

const enviarPagina = (nome) => (req, res) => {
    res.sendFile(path.join(__dirname, 'views', `${nome}.html`));
};

// Páginas
app.get('/', enviarPagina('home'));
app.get('/home', enviarPagina('home'));
app.get('/login', enviarPagina('login'));
app.get('/recuperar-senha', enviarPagina('recuperar-senha'));
app.get('/clientes/cadastrar', enviarPagina('cadastrar-cliente'));
app.get('/funcionario/cadastrar', enviarPagina('cadastrar-funcionario'));
app.get('/produto/cadastrar', enviarPagina('cadastrar-produto'));
app.get('/produto', (req, res) => {
    res.render('ver-produto', { produtos });
});
app.get('/ver-produto', (req, res) => {
    res.render('ver-produto', { produtos });
});
app.get('/funcionario', (req, res) => {
    res.render('visualizar-funcionario', { funcionarios });
});
app.get('/clientes', (req, res) => {
    res.render('visualizar-cliente', { clientes });
});

// Formulários
app.post('/clientes', (req, res) => {
    const { nome, sobrenome, cpf, dataNascimento, telefone, email, senha } = req.body;
    if (nome) {
        clientes.push({ nome, sobrenome, cpf, dataNascimento, telefone, email, senha });
    }
    res.redirect('/clientes');
});

app.post('/funcionario/cadastrar', (req, res) => {
    const {
        inputNomeFunc,
        inputSobrenomeFunc,
        inputCPFFunc,
        inputDataNascFunc,
        inputTelefoneFunc,
        inputCargoFunc,
        inputSalarioFunc,
        inputEmailFunc,
        inputSenha
    } = req.body;

    if (inputNomeFunc) {
        funcionarios.push({
            nome: inputNomeFunc,
            sobrenome: inputSobrenomeFunc,
            cpf: inputCPFFunc,
            dataNascimento: inputDataNascFunc,
            telefone: inputTelefoneFunc,
            cargo: inputCargoFunc,
            salario: formatarMoeda(inputSalarioFunc),
            email: inputEmailFunc,
            senha: inputSenha
        });
    }

    res.redirect('/funcionario');
});

app.post('/produto/cadastrar', (req, res) => {
    const {
        inputNomeProd,
        inputFabricanteProd,
        inputDescricaoProd,
        inputValorProd,
        inputQtdProd
    } = req.body;

    if (inputNomeProd) {
        produtos.push({
            nome: inputNomeProd,
            fabricante: inputFabricanteProd,
            descricao: inputDescricaoProd,
            valor: formatarMoeda(inputValorProd),
            quantidade: inputQtdProd || '0',
            imagem: '/img/produto1.png'
        });
    }

    res.redirect('/produto');
});

app.post('/login', (req, res) => res.redirect('/'));
app.post('/recuperar-senha', (req, res) => res.redirect('/login'));

app.listen(PORT, () => {
    console.log(`Xhopii rodando em http://localhost:${PORT}`);
});
