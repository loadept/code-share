const $ = selector => document.querySelector(selector)

const body = $('body')
body.classList.add('hidden')

try {
  const userData = localStorage.getItem('userData')
  const userDecodedData = JSON.parse(userData || 'null')

  if (userDecodedData?.username) throw new Error('Sesion existente');

  body.classList.remove('hidden')
} catch (err) {
  window.location.href = '/'
}

const authForm = $('#auth-form')
const userInput = $('#user-input')
const userLabel = $('#user-label')

authForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const username = userInput.value

    const data = await fetch('/auth', {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await data.json()

    if (jsonData.status === 'ok') {
      saveUserData(jsonData.data)
      userInput.classList.remove('focus:border-red-500') 
      userLabel.classList.remove('text-red-500')
      return
    }
    throw new Error(jsonData.detail[0].message || 'Ocurrió un error')
  } catch (err) {
    userInput.classList.add('focus:border-red-500') 
    userLabel.classList.add('text-red-500')
    userLabel.textContent = err.message
  }
})

const saveUserData = ({ userId, username }) => {
  const metadata = {
    userId,
    username,
  }

  localStorage.setItem('userData', JSON.stringify(metadata))
  window.location.href = '/'
}

const randNumber = Math.random().toFixed(36).substring(2, 36)
console.log(randNumber)
