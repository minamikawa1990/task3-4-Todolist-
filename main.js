'use strict'

{
    const add = document.getElementById('add');
    const input = document.getElementById('input');
    const tasks = document.getElementById('tasks');
    let todos = [];
    let workingArray = [];
    let completeArray = [];

    
    function filtterWorkingArray() {
         workingArray　= todos.filter( function(value) {
            return value.status === '作業中';
        });
        displayTodos(workingArray);
        return;
    }
    function filtterCompleteArray() {
         completeArray　= todos.filter( function(value) {
            return value.status === '完了';
        });
        displayTodos(completeArray);
        return;
    }

    const addStatus = (status, row, array) => {
        const createBtnStatus = document.createElement('button');
        if(createBtnStatus.textContent === '完了') {
            return;
        }
        const index = row.rowIndex - 1;
        createBtnStatus.textContent = array[index].status;
        status.appendChild(createBtnStatus);
        createBtnStatus.addEventListener('click', () => {
            if(createBtnStatus.textContent === '作業中'){
                createBtnStatus.textContent = '完了';
            }else if(createBtnStatus.textContent === '完了') {
                createBtnStatus.textContent = '作業中';
            }
            array[index].status = createBtnStatus.textContent; //配列の中身も変更
            if (getRadioWorking.checked) {
                filtterWorkingArray();
            }else if (getRadioComplete.checked) {
                filtterCompleteArray();
            }
        });
        return createBtnStatus;
    };

    const removeTask = (remove, row) => {
        const createBtnRemove = document.createElement('button');
        createBtnRemove.textContent = '削除';
        remove.appendChild(createBtnRemove);
        createBtnRemove.addEventListener('click', () => {
            const index = row.rowIndex - 1;
            todos.splice(index, 1);
            if (getRadioWorking.checked) {
                filtterWorkingArray();
                return;
            }
            if (getRadioComplete.checked) {
                filtterCompleteArray();
                return;
            }
            displayTodos(todos);
        });
        return createBtnRemove;
    };

    function displayTodos(array) {
        tasks.innerText = '';
        array.forEach(todo => {
            const todoId = tasks.rows.length;//tbody内の行の個数をId番号に指定
            const row = tasks.insertRow(-1);//変数rowをtasksの最終行に追加
            row.classList.add('tasks');//rowにtasksクラスをつける
            const id = row.insertCell(0);//変数idをrowの1番目に挿入
            const comment = row.insertCell(1);//変数commentをrowの2番目に挿入
            const status = row.insertCell(2);//変数statusをrowの3番目に挿入
            const remove = row.insertCell(3);//変数removeをrowの4番目に挿入
            id.innerText = todoId;//idのテキストをtodoIdに指定
            comment.innerText = todo.task;//コメントのテキストをオブジェクトの値で指定
            
            removeTask(remove, row);
            addStatus(status, row, array);
            });
    }

    function addTask(array) {
        const todo = {
            task: input.value,
            status: '作業中'
        };
        array.push(todo);
        displayTodos(todos);
        input.value = '';
    }

    add.addEventListener('click', () => {
        if(getRadioWorking.checked) {
            addTask(todos);
            filtterWorkingArray();
            return;
        }
        else if(getRadioComplete.checked) {
            const todo = {
                task: input.value,
                status: '作業中'
            };
            todos.push(todo);
            input.value='';
            return;
        }
        addTask(todos);
    })

    const getRadioAll = document.getElementById('radio-all');
    const getRadioWorking = document.getElementById('radio-working');
    const getRadioComplete = document.getElementById('radio-complete');

    getRadioAll.addEventListener('click', () => {
        displayTodos(todos);
    })
    getRadioWorking.addEventListener('click', () => {
        let workingArray　= todos.filter( function(value) {
            return value.status === '作業中';
        });
        displayTodos(workingArray);
    });

    getRadioComplete.addEventListener('click', () => {
        let completeArray = todos.filter( function(value) {
            return value.status === '完了';
        });
        displayTodos(completeArray);
    });

}


