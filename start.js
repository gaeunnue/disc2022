const main= document.querySelector("#main");
const qna= document.querySelector("#qna");
const result= document.querySelector("#result");
const endPoint = 6;
const select= [];

//결과 연산
function calResult(){
  var pointArray = [
    { name: '8월의 끝', value:0, key:0},
    { name: '샤일로', value:0, key:1},
    { name: '초록전쟁', value:0, key:2},
    { name: 'hype boy', value:0, key:3},
    { name: 'attention', value:0, key:4},
    { name: 'high', value:0, key:5},
    { name: 'everything is going well', value:0, key:6},
    { name: 'busan', value:0, key:7}
  ]

  for (let i=0; i< endPoint; i++){
    var target = qnaList[i].a[select[i]];
    for ( let j = 0; j<target.type.length; j++ ){
      for (let k=0; k< pointArray.length; k++){
        if(target.type[j] === pointArray[k].name){
          pointArray[k].value += 1;
        }
      }
    }
  }

  var resultArray = pointArray.sort(function(a,b){
    if(a.value>b.value){
      return -1;
    }
    if(a.value < b.value){
      return 1;
    }
    return 0;
  });
  console.log(resultArray);
  let resultword = resultArray[0].key;
  return resultword;
}

function setResult(){
  let point = calResult();
  
}


function goResult(){
  qna.style.WebkitAnimation= "fadeOut 1s";
  qna.style.animation= "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display="none";
      result.style.display="block";
    },450)})
    setResult();
}

function addAnswer(answerText, qIdx,idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button'); //버튼 속성 추가해주기
  answer.classList.add('answerList'); //클래스 부여
  answer.classList.add('my-5');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');


  a.appendChild(answer);
  answer.innerHTML = answerText;

  //버튼클릭시, 버튼이 사라지고 다음으로 넘어가는 
  answer.addEventListener("click", function(){
    var children= document.querySelectorAll('.answerList');
    for(let i=0; i<children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      select[qIdx] = idx;
      for(let i=0; i<children.length; i++){
       children[i].style.display = "none";
      }
      goNext(++qIdx);
    },450)
  },false);
}
 
function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }
  var q=document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  //버튼은 반복문으로 
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx,i); // 3개의 버튼 채워주는 함수 
  }
  var status= document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}


function begin(){
  main.style.WebkitAnimation= "fadeOut 1s";
  main.style.animation= "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 0.3s";
    qna.style.animation = "fadeIn 0.3s";
    setTimeout(() => {
      main.style.display="none";
      qna.style.display="block";
    },450)
    let qIdx = 0;
    goNext(qIdx);
  },450);
}

