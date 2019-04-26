var app = new Vue({
  el: '#app',
  data: {
      todos: [],
      newtodo: ''
  },
  mounted: function(){
    fetch('http://localhost:8983/solr/crawled/select?indent=on&q='+this.findgetParameter('search')+'&rows=30')
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        this.todos = myJson.response.docs.map(x=>x);
    });
  },
  methods: {
      addtodo: function () {
        this.todos.push(this.newtodo)
      },
      findgetParameter:function(parameterName)
      {
        var result = null,
        tmp = [];
        location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
        return result;  
      },
      getDescription:function(descriptions){
          if(descriptions)
            return descriptions[0];
          else
            return '';
      },
      performsearch:function()
      {
          fetch('http://localhost:8983/solr/crawled/select?indent=on&q='+this.newtodo+'&rows=30')
          .then(response => {
              return response.json();
          })
          .then(myJson => {
              this.todos = myJson.response.docs.map(x=>x);
      });
    }
  }
})
