import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Simula 10 "usuários" virtuais acessando o sistema por 30 segundos
  vus: 10,
  duration: '30s',
};

// Script que cada usuário virtual vai executar
export default function () {
  // 1. Simula um login (use um usuário de teste válido do seu banco)
  const loginPayload = JSON.stringify({
    cpf: '12345678900', // CPF de um usuário de teste
    password: 'senha123',   // Senha dele
  });
  const loginParams = { headers: { 'Content-Type': 'application/json' } };
  const loginRes = http.post('http://localhost:3000/api/auth/signin/credentials', loginPayload, loginParams);

  // Pega o cookie de sessão do login
  const sessionCookie = loginRes.cookies['next-auth.session-token'][0].value;
  
  // 2. Simula uma transferência PIX usando o cookie de sessão
  const transferPayload = JSON.stringify({
    receiverCpf: '00987654321', // CPF de outro usuário de teste
    amount: 1.50,
  });
  const transferParams = {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `next-auth.session-token=${sessionCookie}`, // Envia o cookie para autenticar
    },
  };
  const res = http.post('http://localhost:3000/api/transfer/pix', transferPayload, transferParams);

  // Verifica se a transferência retornou sucesso (status 200)
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1); // Espera 1 segundo antes de repetir
}