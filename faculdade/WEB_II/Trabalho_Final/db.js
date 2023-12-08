async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
        console.log("ERRO");
    }else{
        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection("mysql://root:1234@localhost:3306/pizzaria");
        console.log("Conectou no MySQL!");
        global.connection = connection;
        return connection;
    }
}
connect();

async function insertCliente(cliente){
    const conn = await connect();
    const sql = 'INSERT INTO cliente(CPF,Nome,Endereco,senha,email) VALUES (?,?,?,?,?);';
    const values = [cliente.cpf, cliente.nome, cliente.endereco, cliente.senha, cliente.email];
    return await conn.query(sql, values);
}

async function insertPedido(CPF, Valor, Pagamento) {
    const conn = await connect();
    const sql = 'INSERT INTO pedido(CPF, Valor, Pagamento) VALUES (?, ?, ?)';
    const values = [CPF, Valor, Pagamento];
    return await conn.query(sql, values);
}

async function insertBebidaPedido(Cod_Pedido, Bcod, qtd) {
    const conn = await connect();
    const sql = 'INSERT INTO bebida_pedido(Cod_Pedido, Bcod, qtd) VALUES (?, ?, ?)';
    const values = [Cod_Pedido, Bcod, qtd];
    return await conn.query(sql, values);
}

async function insertPizzaPedido(Cod_Pedido, Pcod, qtd) {
    const conn = await connect();
    const sql = 'INSERT INTO pizza_pedido(Cod_Pedido, Pcod, qtd) VALUES (?, ?, ?)';
    const values = [Cod_Pedido, Pcod, qtd];
    return await conn.query(sql, values);
}

async function execute(query, values = []) {
    const connection = await connect();
  
    try {
      const [rows, fields] = await connection.execute(query, values);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      await connection.end();
    }
  }

module.exports = { connect, insertCliente, insertPedido, insertBebidaPedido, insertPizzaPedido, execute };