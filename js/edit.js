$(document).ready(function() {


    if (!localStorage['editNote']){
        window.location.href = 'index.html';
    }

    $('#editControls').hide();
    var hidden = true;

    $( "#noteName" ).textinput( "disable" );

    var editNote = parseInt(localStorage['editNote']);

    $('#noteName').val(localStorage['noteName_'+editNote]);
    $('#noteText').text(localStorage['noteContent_'+editNote])

    $("#back").click(function() {
        localStorage['noteContent_'+editNote] = $('#noteText').val();
        localStorage['noteModifyDate_'+editNote] = new Date;
        window.location.href = 'index.html';
    });

    $("#edit").click(function() {
        $('#editControls').show();
        $( "#noteName" ).textinput( "enable" );
        $( "#noteText" ).textinput( "disable" );
        
    });

    $("#save").click(function() {
        $( "#noteName" ).textinput( "disable" );
        localStorage['noteName_'+editNote] = $('#noteName').val();
        $('#editControls').hide();
        $( "#noteText" ).textinput( "enable" );
        
    });

    $("#delete").click(function() {
        localStorage.removeItem('noteName_'+editNote);
        localStorage.removeItem('noteContent_'+editNote);
        window.location.href = 'index.html';       
    });
});