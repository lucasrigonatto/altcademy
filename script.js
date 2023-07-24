var refreshList = function() {

  $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=241',
      dataType: 'json',
      success: function (response, textStatus) {

        var sortedResponse = response.tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      $('.do-list').html('');

      sortedResponse.forEach(function (item) {

          var task = item.content;
          var taskID = item.id;
          var completed = item.completed;

          if (!completed) {

              $('.do-list').append('<li id="' + 
              taskID + '" class="list-group-item taskItem"><button class="btn btn-outline-primary d-inline checkButton"><i class="fas fa-check"></i></button><div class="m-3 taskText d-inline h5">' + 
              task + 
              '</div><button class="btn btn-danger d-inline float-right delete""><i class="fas fa-times"></i></button></li>');

          } else {

              $('.do-list').append('<li id="' + 
              taskID + '" class="list-group-item taskItem list-group-item-dark"><button class="btn btn-outline-primary d-inline checkButton btn-outline-success"><i class="fas fa-check"></i></button><div class="m-3 taskText d-inline h5">' + 
              task + 
              '</div><button class="btn btn-danger d-inline float-right delete""><i class="fas fa-times"></i></button></li>');

          }

      });

      },
      error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
      }
  });

}

$(document).on('click', '.btn.addTask', function (event) {

  var input = $('input');

  if (input) {

      $.ajax({
          type: 'POST',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=241',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            task: {
              content: input.val()
            }
          }),
          success: function (response, textStatus) {

              refreshList();
                input.val('');

          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });

  }

});

$(document).on('click', '.btn.delete', function (event) {

  var item = $(this).closest('li');
  var id = item.attr("id");

  $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=241',
      success: function (response, textStatus) {

        item.remove();

      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    
  });

});

$(document).on('click', '.btn.checkButton', function (event) {

  var item = $(this).closest('li');
  var id = item.attr("id");

  $.ajax({
          type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=241',
          dataType: 'json',
          success: function (response, textStatus) {
  
              if (response.task.completed) {

                  $.ajax({
                      type: 'PUT',
                      url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id +'/mark_active?api_key=241',
                      contentType: 'application/json',
                      dataType: 'json',
                      success: function (response, textStatus) {

                          refreshList();
          
                      },
                      error: function (request, textStatus, errorMessage) {
                        console.log(errorMessage);
                      }
                    });
          
              } else {
          
                  $.ajax({
                      type: 'PUT',
                      url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id +'/mark_complete?api_key=241',
                      contentType: 'application/json',
                      dataType: 'json',
                      success: function (response, textStatus) {

                          refreshList();
          
                      },
                      error: function (request, textStatus, errorMessage) {
                        console.log(errorMessage);
                      }
                    });
          
              };

  
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
  });

});

$(document).ready(function () {

  refreshList();

});