const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')  //context

canvas.width = innerWidth
canvas.height = innerHeight

const x = canvas.width / 2
const y = canvas.height / 2

class Player {  // Making the player character
   constructor(x, y, radius, color) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
   }

   draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
   }
}

class Projectile {  // Making the small bolets that gets fired
   constructor(x, y, radius, color, velocity){
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.velocity = velocity
   }

   draw() {
       c.beginPath()
       c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
       c.fillStyle = this.color
       c.fill()
   }

   update() { // The motion of the projectile
      this.draw()
      this.x = this.x + this.velocity.x
      this.y = this.y + this.velocity.y
   }
}

class Enemy {
   constructor(x, y, radius, color, velocity){
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.velocity = velocity
   }

   draw() {
       c.beginPath()
       c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
       c.fillStyle = this.color
       c.fill()
   }

   update() { // Movement of the enemy
      this.draw()
      this.x = this.x + this.velocity.x
      this.y = this.y + this.velocity.y
   }
}

class Lightsaber {
    constructor(x, y, w, h, color){
       this.x = x
       this.y = y
       this.w = w
       this.h = h
       this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(x, y, 20, 0, 2 * Math.PI, false)
        c.fillStyle = this.color
        c.fill()
    }
}

const player = new Player(x, y, 30, 'blue')
const lightsaber = new Lightsaber(x, y, 150, 1000, 'orange')
const projectiles = []
const enemies = []

console.log(Player)
console.log(Lightsaber)

function spawnEnemies() {
   setInterval(() => {
      const radius = Math.random() * (30 - 4) + 4

      let x
      let y

      if (Math.random() < 0.5 ) {
         x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius   // like a if statement
         y = Math.random() * canvas.height  // since const can't use outside the method of if statement
      } else {
         x = Math.random() * canvas.width
         y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
      }

      const color = 'green'

      const angle = Math.atan2(
        canvas.height / 2 - y,   // destanation - star from
        canvas.width / 2 - x)
      console.log(angle)
      const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

      enemies.push( new Enemy(x, y, radius, color, velocity))  // This addes the const ( a variable) to the list
      console.log(enemies)
   }, 1000 )                 // time 1000 ms = 1 s
}

function animate() {
   requestAnimationFrame(animate)
   c.clearRect(0, 0, canvas.width, canvas.height)
   //player.draw()
   lightsaber.draw()
   projectiles.forEach((projectile) => {
      projectile.update()
   })

   enemies.forEach((enemy, index) => {
      enemy.update()

      projectiles.forEach((projectile, projectileIndex) => {
         const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)      //Distance between two points

         // Objects touch
         if(dist - enemy.radius - projectile.radius < 1) {
            setTimeout(() => {
               enemies.splice(index, 1) //remove one at index
               projectiles.splice(projectileIndex, 1)
            }, 0) //waits for the next frame to remove it or above code

         }
      })
   })
}

addEventListener('click', (event) =>  // Adds a listener to listen for mouse clicks
  {
    const angle = Math.atan2(  // This is to find the angle of the clicked to player
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2)
    console.log(angle)
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    projectiles.push(new Projectile( canvas.width / 2, canvas.height / 2, 5, 'red', velocity))

  })

animate()
spawnEnemies()