const useAuthenticate = async () => {
  const response = await fetch('/api/authorize')
  const data = await  response.json()
  return data
}

export default useAuthenticate