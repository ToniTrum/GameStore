export const validateFeedback = (name, value) => {
    let error = ""

    switch (name) {
        case "theme":
            const themeRegExp = /^(?!.*(^\s|\s$)).{1,128}$/;
            if (!themeRegExp.test(value)) {
                error =
                'Тема не может начинаться и заканчиваться на пробел или табуляцию, а также должна иметь длину от 1 до 128 символов';
            }
            break;
        case "text":
            const textRegExp = /^(?!.*(^[\s]|[\s]$))[\s\S]+$/;
            if (!textRegExp.test(value)) {
                error =
                'Текст не может начинаться и заканчиваться на пробел, табуляцию или переход на новую строку, а также не должен быть пустым';
            }
            break;
    }

    return error;
}

export const useFeedbackValidation = (fieldsToValidate) => {
    const errors = {}

    fieldsToValidate.forEach(({ name, value }) => {
        const error = validateFeedback(name, value)
        if (error) {
            error[name] = error;
        }
    })

    return errors
}