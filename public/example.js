const nameH1Element = document.querySelector('h1.inline');
const connectNameElement = document.querySelector('span.red');
const inputModalElement = document.querySelector('dialog#inputModal');
const modalSubmitButton = document.querySelector('button.modalSubmit');
const studentNoSpanElement = document.querySelector('span.studentNo');
const emailSpanElement = document.querySelector('span.email');

//  아래 세개의 set 함수는 이름, 학번, 이메일이 표시되어야 할 HTML 요소의 값을 변경합니다.
const setUserName = (name) => {
  nameH1Element.textContent = name;
  connectNameElement.textContent = name;
};

const setStudentNo = (stdNo) => {
  studentNoSpanElement.textContent = stdNo;
};

const setUserEmail = (email) => { 
  emailSpanElement.textContent = email;
};

const chkStudentNo = (stdNo) => {
  if (stdNo.length != 9 || stdNo === ``) {
    return false;
  } else {
    return true;
  }
};

const chkUserEmail = (email) => {
  // eslint-disable-next-line max-len
  // 이메일의 형식을 @, .의 존재 여부로 판별하는 함수입니다.
  const testEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!testEmail.test(email) || email === ``) return false;
  else return true;
  // if (email.includes('@') && email.includes('.')) {
  //   return true;
  // } else {
  //   return false;
  // }
};

const setLocalInfomation = () => {
  //  새로고침이 되어도 저장된 localStorage의 값을 표시합니다.
  const localName = localStorage.getItem('userName');
  const localStudentNo = localStorage.getItem('studentNo');
  const localUserEmail = localStorage.getItem('userEmail');

  if (localName) setUserName(localName);
  if (localStudentNo) setStudentNo(localStudentNo);
  if (localUserEmail) setUserEmail(localUserEmail);
};
// const localName = localStorage.getItem('userName');
// const localStudentNo = localStorage.getItem('studentNo');
// const localUserEmail = localStorage.getItem('userEmail');

// if (localName) setUserName(localName);
// if (localStudentNo) setStudentNo(localStudentNo);
// if (localUserEmail) setUserEmail(localUserEmail);

setLocalInfomation();

nameH1Element.onclick = () => {
  inputModalElement.showModal();
  // const inputName = prompt(`이름을 입력해주세요.`);
  // if (inputName) {
  //   localStorage.setItem('name', inputName);
  //   setUserName(inputName);
  // } else {
  //   alert(`이름이 입력되지 않았습니다.`);
  // }
};

inputModalElement.onclick = (e) => {
  // 모달 창 이외의 부분을 클릭 시 모달 창 닫히는 함수
  if (e.target.nodeName === 'DIALOG') inputModalElement.close();
};

modalSubmitButton.onclick = (e) => {
  // 모달 창 전송 버튼이 눌리면 form의 정보를 FormData 객체로 담는 함수.
  const modalFormElement = document.querySelector('form.modalForm');
  const formData = new FormData(modalFormElement);
  for (const [key, value] of formData) {
    localStorage.setItem(key, value);
    if (key==='userName') {
      setUserName(value);
    } if (key === 'studentNo') {
      if (chkStudentNo(value)) setStudentNo(value);
      else alert(`잘못된 학번값.`);
    }
    if (key === 'userEmail') {
      if (chkUserEmail(value)) setUserEmail(value);
      else alert(`잘못된 이메일 형식.`);
    }
  }
  inputModalElement.close();
};
