/**
 * 计算阅读时间和字数统计
 */

interface ReadingStats {
  words: number;
  minutes: number;
  time: string;
}

/**
 * 计算中文和英文混合文本的字数
 * 中文按字符数计算，英文按单词数计算
 */
export function calculateReadingTime(content: string): ReadingStats {
  // 移除 Markdown 标记
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]*`/g, '') // 移除行内代码
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // 移除链接，保留文字
    .replace(/[#*_~>`-]/g, '') // 移除 Markdown 标记
    .replace(/\s+/g, ' ') // 合并空白字符
    .trim();

  // 计算中文字符数
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
  
  // 计算英文单词数
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // 总字数 = 中文字符数 + 英文单词数
  const totalWords = chineseChars + englishWords;

  // 平均阅读速度：中文 300 字/分钟，英文 200 词/分钟
  // 这里取平均值约 250 字/分钟
  const wordsPerMinute = 250;
  const minutes = Math.ceil(totalWords / wordsPerMinute);

  // 格式化时间显示
  let time: string;
  if (minutes < 1) {
    time = '约 1 分钟';
  } else if (minutes < 60) {
    time = `约 ${minutes} 分钟`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    time = remainingMinutes > 0 
      ? `约 ${hours} 小时 ${remainingMinutes} 分钟`
      : `约 ${hours} 小时`;
  }

  return {
    words: totalWords,
    minutes,
    time
  };
}

/**
 * 格式化字数显示
 */
export function formatWordCount(words: number): string {
  if (words < 1000) {
    return `${words} 字`;
  } else if (words < 10000) {
    return `${(words / 1000).toFixed(1)}k 字`;
  } else {
    return `${(words / 10000).toFixed(1)}w 字`;
  }
}
