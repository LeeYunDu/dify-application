import { imgPath } from "@/utils"

export const tipTags = [
  {
    label: '写作类型',
    key: 'writeType',
    componentType: 'select',
    options: [
      { label: '文章', value: '文章' },
      { label: '新闻', value: '新闻' },
      { label: '报告', value: '报告' },
      { label: '书籍', value: '书籍' },
    ],
    value: '文章',
    contentKey: [
      '请帮我写一篇',
      '$componentKey'
    ]
  },
  {
    label: '写作主题',
    key: 'writeTitle',
    componentType: 'input',
    value: '乡村建设',
    contentKey: [
      '围绕',
      '$componentKey',
      '为主题'
    ]
  },

  {
    label: '写作风格',
    key: 'writeStyle',
    componentType: 'select',
    options: [
      { label: '正式', value: '正式' },
      { label: '专业', value: '专业' },
      { label: '幽默', value: '幽默' },
      { label: '热情', value: '热情' },
      { label: '吐槽', value: '吐槽' },
      { label: '口语', value: '口语' },
      { label: '书面', value: '书面' },

    ],

    contentKey: [
      '风格为',
      '$componentKey',
    ]
  },
  {
    label: '字数限制',
    key: 'writeLimit',
    componentType: 'input',

    contentKey: [
      '需要写',
      '$componentKey',
      '字'
    ],
    props: {
      style: {
        width: '50px'

      }
    }
  },
  {
    label: '大纲',
    key: 'writeOutline',
    componentType: 'input',
    value: '乡村建设的重要性',
    contentKey: [
      '文章大纲为',
      '$componentKey'
    ]
  },
  {
    label: '关键词',
    key: 'writeKeywords',
    componentType: 'input',
    contentKey: [
      '关键词为',
      '$componentKey'
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
  {
    label: '阅读对象',
    key: 'readAudience',
    componentType: 'select',
    options: [
      { label: '领导', value: '领导' },
      { label: '亲人', value: '亲人' },
      { label: '朋友', value: '朋友' },
      { label: '读者', value: '读者' },
      { label: '大学生', value: '大学生' },
      { label: '商家', value: '商家' },
      { label: '爱人', value: '爱人' },
      { label: '下属', value: '下属' },
    ],
    value: '领导',
    contentKey: [
      '文章面向',
      '$componentKey'
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
  {
    label: '时事内容',
    key: 'writeNews',
    componentType: 'input',
    value: '',
    contentKey: [
      '结合',
      '$componentKey',
      '时事内容'
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
  {
    label: '讲话时长',
    key: 'readDuration',
    componentType: 'input',
    value: '',
    contentKey: [
      '讲话时长为',
      '$componentKey',
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
]



export const writeAIplugins = [
  { label: '润色', key: 'polish', icon: 'polish-1.png', tip: '让您的文笔更加丰富多彩' },
  { label: '续写', key: 'continue', icon: 'polish-2.png', tip: '轻松完成整篇文章' },
  { label: '扩写', key: 'expand', icon: 'polish-3.png', tip: '一键拓展您的文章' },
  { label: '翻译', key: 'translate', icon: 'polish-4.png', tip: '金牌翻译，创作互通' },
  { label: '纠错', key: 'correct', icon: 'polish-5.png', tip: '细致校对' },
  { label: '摘要', key: 'abstract', icon: 'polish-6.png', tip: '正确摘取，高速办公' },
]

