$(document).ready(function() {

    var noteCount = 0;
    var getCount = localStorage['noteCount'];
    $( ".popupButtons" ).on( "buttoncreate", function( event, ui ) {} );

    if(getCount != undefined){
        noteCount = parseInt(getCount);
    }

    function humanizeDate(d){
        
        d = new Date(d);
        var dateString;

        if (d.getHours().length <  10){
            dateString = "0" + d.getHours() + ":";
        } else {
            dateString = d.getHours() + ":";
        }

        if (d.getMinutes() < 10){
            dateString = dateString + "0" + d.getMinutes() + " ";
        } else {
            dateString = dateString +  d.getMinutes() + " ";
        }

        dateString = dateString + d.getDate() + "/" 
        
        if (d.getMonth() < 10){
            dateString = dateString + "0" + d.getMonth() + " ";
        } else {
            dateString = dateString +  d.getMonth() + " ";
        }

        return dateString;

    }
        
    function build(){
        var counter = 0;
        var active = 0;

        while (counter < parseInt(noteCount)){
            getNoteName = localStorage['noteName_'+counter];
            
            if (getNoteName != null){
               var newNote = $('<dt class="note" id="'+counter+'">').text(getNoteName);
               $('.list').append(newNote);

               var createDate = humanizeDate(localStorage['noteCreateDate_'+counter]);
               //alert(localStorage['noteCreateDate_'+counter])

               var newDate = $('<dd class="noteDate" id="dd_'+counter+'">').text(createDate);
               $('.list').append(newDate);
               active = active + 1; 
            }

            counter = counter + 1;
        }

        if (active == 0){
            noteCount = 0;
            $('.list').hide();
        }
    }    
    
    build();
    

    $('#create').click(function() {

        localStorage['editNote'] = noteCount;
        
        noteName = 'New Note ' + (parseInt(noteCount) + 1);
        var newNote = $('<dt class="note" id="'+noteCount+'">').text(noteName);
        $('.list').append(newNote);

        
        currDate = new Date;
        dateString = humanizeDate(new Date);
        var newDate = $('<dd class="noteDate" id="dd_'+noteCount+'">').text(dateString);
        $('.list').append(newDate);

        
        localStorage['noteCreateDate_'+noteCount] = new Date;
        localStorage['noteModifyDate_'+noteCount] = new Date;
        localStorage['noteName_'+noteCount] = noteName;
        localStorage['noteContent_'+noteCount] = "";
        localStorage['noteCount'] = noteCount + 1; 
        
        setClickable();
        
        window.location.href = 'edit.html';
       
    
    });

    function sortBy(sortType){
        
        var counter = noteCount;
                
        var notesOrder = new Array(noteCount+1);

        if (sortType == "abc"){

            var notes = $('.note').detach();
            var dates = $('.noteDate').detach();
            
            notes.sort(function(a,b){ return $(a).text().substr(0,3).toLowerCase() > $(b).text().substr(0,3).toLowerCase() ? 1 : -1; });
            

            for (var i=0; i < noteCount; i++){
                $(".list").append(notes[i]);
                $(".list").append($('<dd class="noteDate">').text($(notes[i]).text().substr(0,1).toUpperCase()));
            }

            $('.popupButtons').attr("data-icon","arrow-r");
            $('.popupButtons').attr("data-theme","c");
            $('#abc').attr("data-icon","arrow-d");
            $('#abc').attr("data-theme","a");

            
            $('.popupButtons').buttonMarkup({
            create: function( event, ui ) {}
            });
            

        }

        if (sortType == "abc_back"){

            var notes = $('.note').detach();
            var dates = $('.noteDate').detach();

            notes.sort(function(a,b){ return $(a).text().substr(0,3).toLowerCase() < $(b).text().substr(0,3).toLowerCase() ? 1 : -1; });
            

            for (var i=0; i < noteCount; i++){
                $(".list").append(notes[i]);
                $(".list").append($('<dd class="noteDate">').text($(notes[i]).text().substr(0,1).toUpperCase()));
            }

            $('.popupButtons').attr("data-icon","arrow-r");
            $('.popupButtons').attr("data-theme","c");
            $('#abc').attr("data-icon","arrow-u");
            $('#abc').attr("data-theme","a");
            
            $('.popupButtons').buttonMarkup({
            create: function( event, ui ) {}
            });

        }

        if (sortType == "modify"){

            var notes = $('.note').detach();
            var dates = $('.noteDate').detach();

            notes.sort(function(a,b){ return localStorage['noteModifyDate_' + $(a).attr('id')] < localStorage['noteModifyDate_' + $(b).attr('id')] ? 1 : -1; });
            

            for (var i=0; i < noteCount; i++){
                $(".list").append(notes[i]);
                $(".list").append($('<dd class="noteDate">').text(humanizeDate(localStorage['noteModifyDate_' + $(notes[i]).attr('id')])));
            }

            $('.popupButtons').attr("data-icon","arrow-r");
            $('.popupButtons').attr("data-theme","c");
            $('#modify').attr("data-icon","arrow-d");
            $('#modify').attr("data-theme","a");
            
            $('.popupButtons').buttonMarkup({
            create: function( event, ui ) {}
            });

        }

        if (sortType == "modify_back"){

            var notes = $('.note').detach();
            var dates = $('.noteDate').detach();

            notes.sort(function(a,b){ return localStorage['noteModifyDate_' + $(a).attr('id')] > localStorage['noteModifyDate_' + $(b).attr('id')] ? 1 : -1; });
            

            for (var i=0; i < noteCount; i++){
                $(".list").append(notes[i]);
                $(".list").append($('<dd class="noteDate">').text(humanizeDate(localStorage['noteModifyDate_' + $(notes[i]).attr('id')])));


            }

            $('.popupButtons').attr("data-icon","arrow-r");
            $('.popupButtons').attr("data-theme","c");
            $('#modify').attr("data-icon","arrow-u");
            $('#modify').attr("data-theme","a");
            
            $('.popupButtons').buttonMarkup({
            create: function( event, ui ) {}
            });

        }

        if (sortType == "created"){

            var notes = $('.note').detach();
            var dates = $('.noteDate').detach();

            notes.sort(function(a,b){ return localStorage['noteCreateDate_' + $(a).attr('id')] > localStorage['noteCreateDate_' + $(b).attr('id')] ? 1 : -1; });
            

            for (var i=0; i < noteCount; i++){
                $(".list").append(notes[i]);
                $(".list").append($('<dd class="noteDate">').text(humanizeDate(localStorage['noteCreateDate_' + $(notes[i]).attr('id')])));

            }

            $('.popupButtons').attr("data-icon","arrow-r");
            $('.popupButtons').attr("data-theme","c");
            $('#created').attr("data-icon","arrow-d");
            $('#created').attr("data-theme","a");
            
            $('.popupButtons').buttonMarkup({
            create: function( event, ui ) {}
            });
            
        }

        if (sortType == "created_back"){

            var notes = $('.note').detach();
            var dates = $('.noteDate').detach();

            notes.sort(function(a,b){ return localStorage['noteCreateDate_' + $(a).attr('id')] < localStorage['noteCreateDate_' + $(b).attr('id')] ? 1 : -1; });
            

            for (var i=0; i < noteCount; i++){
                $(".list").append(notes[i]);
                $(".list").append($('<dd class="noteDate">').text(humanizeDate(localStorage['noteCreateDate_' + $(notes[i]).attr('id')])));

            }

            $('.popupButtons').attr("data-icon","arrow-r");
            $('#created').attr("data-icon","arrow-u");
            $('#created').attr("data-theme","a");
            
            $('.popupButtons').buttonMarkup({
            create: function( event, ui ) {}
            });

        }
    }

    
    $('.popupButtons').click(function() {
        
        if (localStorage['lastSort'] == $(this).attr('id')){
            sortBy($(this).attr('id')+"_back");
            localStorage['lastSort'] = $(this).attr('id') + "_back"
        } else {
            sortBy($(this).attr('id'));
            localStorage['lastSort'] = $(this).attr('id')
        }
        
        $( "#popup" ).popup( "close" );

    });

    
    function setClickable(){
        $(".note").click(function () {
            localStorage['editNote'] = parseInt($(this).attr('id'));
            window.location.href = 'edit.html';
        });
    
    }

    setClickable();


});