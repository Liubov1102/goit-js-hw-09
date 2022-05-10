import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) { 
  event.preventDefault(); 
  const values = {
    delay: Number(delayEl.value),
    step: Number(stepEl.value),
    amount: Number(amountEl.value),
  }
   promise(values);   
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

function promise({ delay, step, amount }) {
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


