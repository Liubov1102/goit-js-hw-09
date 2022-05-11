import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) { 
  event.preventDefault(); 
  
  const values = {
    delay: Number(event.currentTarget.delay.value),
    step: Number(event.currentTarget.step.value),
    amount: Number(event.currentTarget.amount.value),
  }
   promiseGenerator(values);   
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  if (shouldResolve) {
    resolve({ position: position, delay: delay });
  } else {
    reject({ position: position, delay: delay });
    }
  }, delay);
  })
};

function promiseGenerator({ delay, step, amount }) {
  let totalDelay = delay;
  for (let i = 1; i <= amount; i+=1) {
    
    createPromise(i, totalDelay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += step;
  }
} 


