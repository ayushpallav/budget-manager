window.onload = function(){
    // set limit at the load of extension
    // if already exists then display or prompt to make user input one before start
    chrome.storage.sync.get('limit',function(obj){
      if (obj.limit)
      {
        document.getElementById('limit').innerHTML = parseInt(obj.limit);
        chrome.storage.sync.get('balance',function(obj){
          if(obj.balance)
            document.getElementById('balance').innerHTML = parseInt(obj.balance);
            set_color(parseInt(obj.balance));
        });
      }
      else {
        var new_set = window.prompt("Set your transaction limit first");
        chrome.storage.sync.set({'limit' : new_set});
        chrome.storage.sync.set({'balance' : new_set});
        document.getElementById('limit').innerHTML = new_set;
        document.getElementById('balance').innerHTML = new_set;
        set_color(parseInt(new_set));
      }
    });

    // To enter new transaction positive is debit ans negative is credit
    document.getElementById('IPT').onclick = enter_transaction;
    function enter_transaction(){
        chrome.storage.sync.get('balance',function(o1){
          var new_val = 0;
          if(o1.balance)
            new_val = parseInt(o1.balance);
          var new_trans = document.getElementById('Transaction').value;
          new_val = parseInt(new_val) - parseInt(new_trans);
          if(parseInt(new_val)==0)
          {
            alert("You have reached your set limit");
          }
          else if(parseInt(new_val)<0)
          {
            alert("You are in a debt of " + new_val + " ! ");
          }
          chrome.storage.sync.set({'balance' : new_val});
          document.getElementById('balance').innerHTML = parseInt(new_val);
          document.getElementById('Transaction').value = "";
          set_color(new_val);
        })
    }

    // To reset the limit of transaction and change the balance accordingly
    document.getElementById('changeLimit').onclick = reset_limit;
    function reset_limit(){
      chrome.storage.sync.get('balance',function(obj){
        var new_limit = window.prompt("Set new limit");
        var x = document.getElementById('limit').innerHTML;
        chrome.storage.sync.set({'limit' : new_limit});
        document.getElementById('limit').innerHTML = new_limit;
        var y = parseInt(new_limit) - parseInt(x) + parseInt(obj.balance);
        chrome.storage.sync.set({'balance' : y});
        document.getElementById('balance').innerHTML = parseInt(y);
        //console.log(parseInt(y));
      })
    }

    //To reset balance
    document.getElementById('reset').onclick = reset_bal;
    function reset_bal(){
      var x = document.getElementById('limit').innerHTML;
      console.log(x);
      chrome.storage.sync.set({'balance':parseInt(x)});
      document.getElementById('balance').innerHTML = parseInt(x);
      set_color(parseInt(x));
    }

    // To set color
    function set_color(new_val){
      if(parseInt(new_val)>0)
        document.getElementById('balance').style.color = "green";
      else if(parseInt(new_val)<0)
        document.getElementById('balance').style.color = "red";
      else
        document.getElementById('balance').style.color = "yellow";
    }
}
