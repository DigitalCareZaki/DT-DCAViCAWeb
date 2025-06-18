'use client';

import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';

import { setRoomsReducer } from '@slice';

import RenderMessages from './RenderMessages';
import Search from './Search';

import type { ClientComponentProps } from '@types';
import type { MessagesProps } from './types';
import type { MessageSearchUserProps } from '@types';
import { searchUsersMessages as searchUsers } from '@service';

const Messages: ClientComponentProps<MessagesProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [recipient, setRecipient] = useState<MessageSearchUserProps | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MessageSearchUserProps[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(setRoomsReducer({ rooms: data ?? [] }));
  }, [data]);

  // Debounced search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setRecipient(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value) {
      setSearchResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const res = await searchUsers(value);
      setSearchResults(res.success ? res.data : []);
      setLoading(false);
    }, 400);
  };

  const handleSelectRecipient = (user: MessageSearchUserProps) => {
    setRecipient(user);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSend = () => {
    if (!recipient || !message.trim()) return;
    // TODO: Implement send message API call here
    setShowNewMessage(false);
    setRecipient(null);
    setMessage('');
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-black">Contacts</span>
            <div className="theme-bg-color flex h-6 w-6 items-center justify-center rounded-full text-white">
              <span className="mt-[1px] text-ssx font-semibold">
                +{data.length}
              </span>
            </div>
          </div>
          {/*
          <FiEdit
            className="theme-text-color cursor-pointer transition duration-300 hover:scale-[105%]"
            onClick={() => setShowNewMessage(true)}
          />
          */}
        </div>
        <Search />
      </div>
      <RenderMessages />
      {showNewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-gray-100 rounded-2xl shadow-2xl p-0 w-full max-w-lg relative flex flex-col overflow-hidden border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-lg font-bold">
                  <span>U</span>
                </div>
                <span className="font-semibold text-gray-800 text-lg">New Message</span>
              </div>
              <button
                className="text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowNewMessage(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-4 px-6 py-6 bg-gray-100">
              {!recipient && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search recipient..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  {loading && <div className="absolute right-3 top-2 text-xs text-gray-400">Loading...</div>}
                  {searchResults.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {searchResults.map((user, idx) => (
                        <li
                          key={user.email + idx}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
                          onClick={() => handleSelectRecipient(user)}
                        >
                          {user.first_name} {user.last_name} <span className="text-xs text-gray-400">({user.email})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {recipient && (
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border border-gray-300">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-base font-bold">
                    <span>{recipient.first_name[0]}</span>
                  </div>
                  <span className="font-medium text-gray-700">{recipient.first_name} {recipient.last_name}</span>
                  <button className="ml-auto text-xs text-red-400 hover:text-red-600" onClick={() => setRecipient(null)}>Remove</button>
                </div>
              )}
              <div className="flex flex-col items-end">
                <textarea
                  placeholder="Type your message..."
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 shadow-sm"
                  style={{ minHeight: '80px' }}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={!recipient}
                />
              </div>
            </div>
            <div className="flex justify-end items-center px-6 py-4 bg-white border-t border-gray-200">
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition disabled:opacity-50"
                onClick={handleSend}
                disabled={!recipient || !message.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;