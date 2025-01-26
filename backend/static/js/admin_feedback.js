document.addEventListener('DOMContentLoaded', function() {
    const statusField = document.getElementById('id_status');
    const commentField = document.getElementById('id_comment');
    
    function toggleCommentField() {
        const status = statusField.value;
        console.log(status);
        if (status === 'Принято' || status === 'Отклонено') {
            commentField.disabled = false;
        } else {
            commentField.disabled = true;
        }
    }

    const observer = new MutationObserver(() => {
        toggleCommentField();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    toggleCommentField();
});