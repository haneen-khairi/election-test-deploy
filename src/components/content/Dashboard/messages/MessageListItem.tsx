import React, { useState } from 'react';
import EditIcon from './EditIcon';
import { Button, Flex, useToast } from '@chakra-ui/react';
import DeleteIcon from './DeleteIcon';
import axios from 'axios';
import useAuthStore from '@store/AuthStore';
import { EToast } from '@constants/functions/toast';

interface MessageListItemProps {
  title: string;
  id: string;
  onClick: (id: string, name: string) => void;
  onDelete: () => void;
  onEdit: (id: string) => void;
  isStatic?: boolean
}

export default function MessageListItem({ title, id, onClick, onDelete, onEdit, isStatic }: MessageListItemProps) {
  const toast = useToast();
  const { data } = useAuthStore();
  // const [isActive, setIsActive] = useState(false);

  const handleItemClick = () => {
    if(isStatic) return;
    // setIsActive(true);
    onClick(id, title);
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click from bubbling to parent item
    console.log("Edit:", id);
    onEdit(id)
  };

  const handleDeleteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const response = await axios.delete(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/details/${id}/`, {
        headers: {
          'Authorization': `Bearer ${data?.tokens?.access}`
        }
      });
      console.log("Delete response:", response.data);

      if (response.data.status) {
        onDelete();
        EToast({
          toast,
          status: "success",
          title: "نجاح العملية",
          description: "تم الحذف بنجاح",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
//className={isActive ? 'list-active' : ''}
  return (
    <button  onClick={handleItemClick}> {/* Add 'active' class conditionally */}
      <Flex 
        gap="12px" 
        padding="26px 16px" 
        borderBottom="1px solid #0000001F" 
        justifyContent="space-between" 
        alignItems="center"
      >
        <h6 className="list__title">{title}</h6>
        {!isStatic &&<div>
          <Button
            w="24px"
            height="24px"
            backgroundColor="transparent"
            paddingX={0}
            paddingY="18px"
            onClick={handleEditClick}
          >
            <EditIcon />
          </Button>
          <Button
            w="24px"
            height="24px"
            backgroundColor="transparent"
            paddingX={0}
            paddingY="18px"
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </Button>
        </div>}
      </Flex>
    </button>
  );
}
