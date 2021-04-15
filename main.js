'use strict'

{
    const add = document.getElementById('add');
    const input = document.getElementById('input');
    const tasks = document.getElementById('tasks');
    let todos = [];

    const addStatus = (status, row) => {
        const createBtnStatus = document.createElement('button');
        if(createBtnStatus.textContent === '完了') {
            return;
        }
        const index = row.rowIndex - 1;
        createBtnStatus.textContent = todos[index].status;
        status.appendChild(createBtnStatus);
        createBtnStatus.addEventListener('click', () => {
            if(createBtnStatus.textContent === '作業中'){
                createBtnStatus.textContent = '完了';
            }else if(createBtnStatus.textContent === '完了') {
                createBtnStatus.textContent = '作業中';
            }
            todos[index].status = createBtnStatus.textContent; 
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
            displayTodos();
        });
        return createBtnRemove;
    };

    function displayTodos(todos) {
        tasks.innerText = '';
        todos.forEach(todo => {
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
            addStatus(status, row);
            });
    }

    function addTask() {
        const todo = {
            task: input.value,
            status: '作業中'
        };
        todos.push(todo);
        displayTodos();
        input.value = '';
    }

    add.addEventListener('click', () => {
        addTask();
        console.log(todos);
    })

    const getRadioAll = document.getElementById('radio-all');
    const getRadioWorking = document.getElementById('radio-working');
    const getRadioComplete = document.getElementById('radio-complete');

    getRadioAll.addEventListener('click', () => {
        console.log('aaa');
        displayTodos();
    })
    getRadioWorking.addEventListener('click', () => {
        const workingArray　= todos.filter( function(value) {
            return value.status === '作業中';
        });
        displayTodos(workingArray);
        console.log(workingArray);
    });

    getRadioComplete.addEventListener('click', () => {
        const completeArray = todos.filter( function(value) {
            return value.status === '完了';
        });
        
        displayTodos(completeArray);
        console.log(completeArray);
    });

}


