import { resolve } from 'node:path';

try {
  process.loadEnvFile(resolve(import.meta.dirname, '..', '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const token = String(process.env.TELEGRAM_BOT_TOKEN || '').trim();
if (!token) {
  console.error('Add TELEGRAM_BOT_TOKEN to .env, add the bot to the group, then run this again.');
  process.exit(1);
}

const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await response.json();
if (!data.ok) {
  console.error('Telegram rejected the token. Check TELEGRAM_BOT_TOKEN.');
  process.exit(1);
}

function chatsFromUpdate(update) {
  return [
    update.message?.chat,
    update.edited_message?.chat,
    update.channel_post?.chat,
    update.my_chat_member?.chat,
    update.chat_member?.chat
  ].filter((chat) => chat?.id);
}

const chats = new Map();
for (const update of data.result || []) {
  for (const chat of chatsFromUpdate(update)) {
    const type = chat.type || 'chat';
    const label = [chat.title, chat.username, chat.first_name, chat.last_name].filter(Boolean).join(' ');
    chats.set(String(chat.id), { type, label: label || type });
  }
}

if (!chats.size) {
  console.error(`No chats yet. In Telegram:
1. Open the group
2. Add your bot as a member (admin is best)
3. Send a short message in the group, such as: hello
4. Run this command again`);
  process.exit(1);
}

const rows = [...chats.entries()].sort((a, b) => {
  const rank = (type) => (type === 'supergroup' || type === 'group' ? 0 : 1);
  return rank(a[1].type) - rank(b[1].type);
});

console.log('Use a group/supergroup ID as TELEGRAM_CHAT_ID in .env:\n');
for (const [id, chat] of rows) {
  console.log(`${id}    [${chat.type}] ${chat.label}`);
}

if (![...chats.values()].some((chat) => chat.type === 'group' || chat.type === 'supergroup')) {
  console.log('\nNo group yet. Add the bot to the group, send a message there, then run this again.');
}
