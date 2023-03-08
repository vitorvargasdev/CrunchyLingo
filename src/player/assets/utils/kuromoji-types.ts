export type Tokenize = {
    'basic_form': string
    'conjugated_type': string
    pos: string
    'pos_detail_1': string
    'pos_detail_2': string
    'pos_detail_3': string
    pronunciation: string
    reading: string
    'surface_form': string
    'word_id': string
    'word_position': string
    'word_type': string
}

export type Tokenizer = {
    tokenize: (
        text: string
    ) => Tokenize[]
}

export type KuromojiBuild = {
    build: (
        token: (
            err: boolean,
            tokenizer: Tokenizer
        ) => object
    ) => Tokenizer
}

export type DicPath = {
    dicPath: string
}

export type KuromojiBuilder = {
    builder: (
        dicPath: DicPath
    ) => KuromojiBuild
}
