const createElements =(arr)=>{
    const htmlElements =arr.map((el) => `<span class="btn bg-lime-100 border-none">${el}</span>`);
    return(htmlElements.join(" "));
};
const manageLoader =(isLoading)=>{
    if(isLoading == true){
        document.getElementById("loader").classList.remove("hidden");
        document.getElementById("word-container").classList.remove("hidden");
}
else{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");   
}
}
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data));
};

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    manageLoader(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayLevelWord(data.data);
            removeActive();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            if (clickedBtn) {
                clickedBtn.classList.add("active");
            }
        });
};
const loadWordDetails =async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res =await fetch (url);
    const details =await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML =`
         <div>
       <div>
        <h2 class="text-2xl font-medium">${word.word} (<i class="fa-solid fa-microphone-lines font"></i> :${word.pronunciation})</h2>
      </div>
    <div id=" details-container">
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
    </div>
      <div>
        <h2 class="font-bold">Example</h2>
         <p>${word.sentence}</p>
      </div>
      <div class="space-y-2 items-center">
        <h2 class="font-bold">Synonym </h2>
        
        <div class="space-y-2 items-center">${createElements(word.synonyms)} </div>
       
      </div>

      <div>
        <button class="btn bg-blue-900 text-white border-none">Continue Learning</button>
      </div>
     </div>
    `;

    document.getElementById("word_modal").showModal();
    
};
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
             <div class=" text-center flex flex-col items-center justify-center col-span-full p-6 gap-2">
                 <img src="assets/alert-error.png" alt="">
                 <h5 class="text-[14px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h5>
                 <h2 class="font-medium text-[32px] text-[#292524]">নেক্সট Lesson এ যান</h2>
             </div>
        `;
        manageLoader(false);
        return;
    }

    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium ">
                ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / 
                ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি "}
            </div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-blue-100 border-none hover:bg-blue-200">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-blue-100 border-none hover:bg-blue-200">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
    manageLoader(false);
};

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button 
            id="lesson-btn-${lesson.level_no}" 
            onclick="loadLevelWord(${lesson.level_no})" 
            class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
        levelContainer.append(btnDiv);
    }
};

loadLessons();
