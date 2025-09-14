const loadLessons =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") 
    .then((res)=> res.json())
    .then((json)=> displayLessons(json.data) );
}
const displayLessons=(lessons)=>{
    // 1 get the container
    const levelContainer= document.getElementById("level-container");
    levelContainer.innerHTML ="";
    // 2 get onto every lessons
    for(let lesson of lessons){

          // 3. creat element
         const btnDiv= document.createElement("div");
         btnDiv.innerHTML = `
     <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
    `;

    // append into container
    levelContainer.append(btnDiv);

    }
  
    

};
loadLessons();