try{
vart
}catch(error){
console.log('ошибка')
}

console.log('это то, что уже после')

setTimeout(() => {
    try{
    vart
    }catch(error){
    console.dir(error.name)    
    console.log('ошибка')
    }},1000)


// function getFruits(name){
//  const fruits = {
//     fruit1: 'potato',
//     fruit2: 'cucumber'
//  }
//  return new Promise(resolve => setTimeout(() => resolve(fruits[name]), 1000))
//     }



// async function makeSmusi(){
//     const fruit1 = await getFruits('fruit1')
//     console.log(fruit1)
//     const fruit2 = await getFruits('fruit2')
//     console.log(fruit2)
//     }
   
//     makeSmusi()

    
function getFruits(name){
    const fruits = {
       fruit: 'potato',
       fruit2: 'cucumber'
    }
    return new Promise(resolve => setTimeout(() => resolve(fruits[name]), 1000))
       }
   
   
   
   async function makeSmusi(){try{
    const fruit1 =  getFruits('fruit1')
  
       const fruit2 = getFruits('fruit2')
        
       const fruits = await Promise.all([fruit1,fruit2])
       console.log(fruits)
   } catch(error){console.log('ошибка')}
       
    }
      
       makeSmusi()