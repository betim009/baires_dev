function solution(N, ratings) {
    // You must complete the logic for the function that is provided
    // before compiling or submitting to avoid an error.

    // Write your code here
    let resultadoNota = 0;

    let resultadoQtd = 0;
    for (let index = 0; index < ratings.length; index++) {
        let notaAtual = ratings[index][1]
        let qtdAtual = ratings[index][0]

        if (notaAtual > resultadoNota) {
            resultadoNota = notaAtual
            resultadoQtd = qtdAtual
        } else if (notaAtual == resultadoNota) {
            if (qtdAtual < resultadoQtd) {
                resultadoNota = notaAtual
                resultadoQtd = qtdAtual
            }
        }
    }
    return resultadoQtd

}