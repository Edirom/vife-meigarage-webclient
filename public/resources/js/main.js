var boxes = document.querySelectorAll('input[type="checkbox"]');

for (var box of boxes) {
    
    box.addEventListener('click',(e)=> {
    
        var level = e.target.getAttribute('data-level');
        var ident = e.target.getAttribute('data-ident');
        var parent = e.target.getAttribute('data-parent');
        var active = e.target.checked;
        
        setToggles(level,ident,parent,active);
    });
}

document.getElementById('upload').addEventListener('click', () => {
    var files = document.getElementById('selectFiles').files;
    console.log(files);
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();
    
    fr.onload = function(e) { 
        console.log(e);
        var deactivated = JSON.parse(e.target.result);
        
        activateAll();
        for(var i=0;i<deactivated.length;i++) {
            var current = deactivated[i];
            setToggles(current.level,current.ident,current.parent,false);
        }
        
    }
    
    fr.readAsText(files.item(0));
});

var data = [];

function activateAll() {
    for(var i=0;i<data.length;i++) {
        var current = data[i];
        setToggles(current.level,current.ident,current.parent,true);
    }
};

function setToggles(level,ident,parent,active) {
    let affected;
    let checkboxes;
    
    console.log('setToggles(' + level + ',' + ident + ',' + parent + ',' + active + ')')
    
    if(level === 'attClass' && parent === null) {
        affected = document.querySelectorAll('*[data-ident="' + ident + '"]');
        checkboxes = document.querySelectorAll('input[type="checkbox"][data-ident="' + ident + '"]')
        
    } else if(level === 'module') {
        affected = document.querySelectorAll('*[data-module="' + ident + '"]');
        checkboxes = document.querySelectorAll('input[type="checkbox"][data-ident="' + ident + '"]')
        
    } else if(level === 'element') {
        affected = document.querySelectorAll('details[data-ident="' + ident + '"]');
        checkboxes = document.querySelectorAll('input[type="checkbox"][data-ident="' + ident + '"]')
        
    } else {
        affected = document.querySelectorAll('*[data-ident="' + ident + '"][data-parent="' + parent + '"]');
        checkboxes = document.querySelectorAll('input[type="checkbox"][data-ident="' + ident + '"][data-parent="' + parent + '"]')
        
    }
    
    try {
        keepNotes(level,ident,parent,active);
        
        if(active) {
            for(var elem of affected) {
                elem.classList.remove('turnedOff');
            }
        } else {
            for(var elem of affected) {
                elem.classList.add('turnedOff');
            }
        }
        
        for(var box of checkboxes) {
            box.checked = active;
        }
    } catch(err) {
        console.log('Unable to process. Probably trying to turn on something turned off elsewhere? (' + err + ')');
    }
    
    
    
    
}

function keepNotes(level,ident,parent,active) {

    if(!active) {
        let container;
        let statement = document.createElement('div');
        statement.classList.add('statement');
        switch (level) {
            case 'module': 
                statement.innerHTML = 'remove ' + ident;
                statement.id = 'remove_' + ident;
                container = document.getElementById('moduleDecisions');
                break;
            case 'element': 
                statement.innerHTML = 'remove ' + ident;
                statement.id = 'remove_' + ident;
                container = document.getElementById('elementDecisions');
                break;
            default: 
                if(parent === null) {
                    statement.innerHTML = 'globally remove ' + ident;
                    statement.id = 'remove_' + ident.replace(/\./g,'') + '_global';
                    container = document.getElementById('attributeDecisions');
                } else {
                    statement.innerHTML = 'remove ' + ident + ' from ' + parent;
                    statement.id = 'remove_' + ident.replace(/\./g,'') + '_' + parent.replace(/\./g,'');
                    container = document.getElementById('attributeDecisions');
                }
                
        }
        
        data.push({level,ident,parent});
        container.appendChild(statement);
    } else {
        let container;
        let statement;
        switch (level) {
            case 'module':
                statement = document.getElementById('remove_' + ident);
                container = document.getElementById('moduleDecisions');
                break;
            case 'element':
                statement = document.getElementById('remove_' + ident);
                container = document.getElementById('elementDecisions');
                break;
            default:
                if(parent === null) {
                    statement = document.getElementById('remove_' + ident.replace(/\./g,'') + '_global');
                    container = document.getElementById('attributeDecisions');
                } else {
                    statement = document.getElementById('remove_' + ident.replace(/\./g,'') + '_' + parent.replace(/\./g,''));
                    container = document.getElementById('attributeDecisions');   
                }
                
        }
        data = data.filter((elem) => {
            return !(elem.level === level &&
                    elem.ident === ident &&
                    elem.parent === parent)
        })
        container.removeChild(statement);
        
    }
    
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    let dl = document.getElementById('download');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "MEI-profile-" + new Date(Date.now()).toISOString() + ".json");
    
}