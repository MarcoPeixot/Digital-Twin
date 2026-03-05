// lib/fetcher.ts
export const fetcher = async (url: string) => {
  const res = await fetch(url)

  // Se o status da resposta não for 'ok' (ex: 404, 401, 500),
  // vamos extrair a mensagem de erro da API e disparar um erro.
  if (!res.ok) {
    const errorData = await res.json()
    const error = new Error(errorData.message || 'Ocorreu um erro ao buscar os dados.')
    throw error
  }

  // Se a resposta for 'ok', retornamos os dados em JSON.
  return res.json()
}