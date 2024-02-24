import { Category_Create } from '@/api/category/Category_Create'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import ImportCategoriesModal from '@/routes/Categories/CategoryCreate/components/ImportCategoriesModal'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { UploadSimple } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Card, Flex, Form, Input, Typography } from 'antd'

const { Item: FormItem } = Form

type FieldType = {
    name: string
}

export default function CategoryCreatePage() {
    const [form] = Form.useForm()
    const { messageApi } = useMessage()
    const navigate = useNavigate()
    const createCategory = useMutation({
        mutationFn: Category_Create,
        onSuccess: async () => {
            setTimeout(
                () =>
                    messageApi.success(
                        <span>
                            Category created successfully.
                            <Button
                                onClick={() => navigate({ to: CategoryListRoute.to, search: { tab: 'all' } })}
                                style={{
                                    marginLeft: '10px',
                                }}
                            >
                                View
                            </Button>
                        </span>,
                    ),
                250,
            )
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
            form.resetFields()
        },
        onError(error) {
            devLog('Error creating category: ', error.message)
            setTimeout(() => messageApi.error('Something went wrong. Please try again.'), 250)
        },
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Creating Category...',
                key: 'creating-category',
            })
        },
        onSettled: () => {
            messageApi.destroy('creating-category')
        },
    })

    return (
        <Flex vertical gap={20}>
            <Flex justify='space-between'>
                <Typography.Title level={2}>Create a new Category</Typography.Title>
                <ImportCategoriesModal>
                    {({ handleOpen }) => (
                        <Button type='primary' icon={<UploadSimple size={14} />} onClick={handleOpen}>
                            Import from JSON
                        </Button>
                    )}
                </ImportCategoriesModal>
            </Flex>
            <Card size='default' title='Category Details'>
                <Form<FieldType>
                    form={form}
                    name='add-category-form'
                    initialValues={{
                        name: '',
                    }}
                    autoComplete='off'
                    onFinish={values => {
                        createCategory.mutate({
                            name: values.name,
                        })
                    }}
                >
                    <FormItem<FieldType>
                        name='name'
                        label='Name'
                        rules={[
                            {
                                required: true,
                                max: 200,
                                min: 1,
                            },
                            // TODO Check if name already exists
                        ]}
                    >
                        <Input disabled={createCategory.isPending} />
                    </FormItem>
                    <Button form='add-category-form' htmlType='submit' color='primary' type='primary' loading={createCategory.isPending}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </Flex>
    )
}
