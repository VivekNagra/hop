import { Text, VStack } from '@chakra-ui/react';
import { THEME_COLORS } from '@shangrila-cargo/theme/colors';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { highestSeriesValue } from '../hooks';
import { ChartLegend } from './ChartLegend';
import { ChartTooltip } from './ChartTooltip';

export const LineChart = ({
  data,
}: {
  data: Array<{ name: string; Inquiry: number; Booking: number }>;
}) => {
  return (
    <VStack
      rounded={'xl'}
      alignItems={'flex-start'}
      border={'1px solid'}
      borderColor={'gray.100'}
      rowGap={5}
      px={7}
      py={5}
    >
      <Text variant={'md_semibold'} ms={-1}>
        Activities
      </Text>
      <ResponsiveContainer minWidth={'100%'} minHeight="446px">
        <RechartsLineChart
          data={data}
          margin={{ bottom: 10, right: 12 }}
          style={{
            background:
              'repeating-linear-gradient(90deg, white, white 24px, #FAFCFF 24px, #FAFCFF 74px)',
          }}
        >
          <CartesianGrid
            strokeDasharray="4"
            vertical={false}
            stroke="#9CA3AF"
            strokeWidth={'2px'}
          />
          <XAxis
            type="category"
            domain={['auto', 'auto']}
            dataKey="name"
            fontFamily="Satoshi"
            fontSize={'16px'}
            axisLine={false}
            tickMargin={16}
            tick={{
              fill: THEME_COLORS.gray[500],
              fontSize: 16,
              fontWeight: 500,
            }}
          />
          <YAxis
            type="number"
            domain={['auto', 'auto']}
            fontFamily="Satoshi"
            fontSize={'16px'}
            axisLine={false}
            tick={{
              dx: -10,
              fill: THEME_COLORS.gray[500],
              fontSize: 16,
              fontWeight: 500,
            }}
            width={
              highestSeriesValue
                ? `${highestSeriesValue({ data, keys: ['Inquiry', ' Booking'] })}`
                    ?.length * 17
                : 17
            }
          />
          <Tooltip
            cursor={{
              stroke: THEME_COLORS.butterflyBlue,
              filter:
                'drop-shadow(0px 50px 89px #34B3F1) drop-shadow(0px 9px 17px rgba(7, 155, 226, 0.43))',
              strokeWidth: 2,
            }}
            content={<ChartTooltip />}
          />
          <Legend
            align="left"
            verticalAlign="top"
            layout="horizontal"
            fontFamily="Satoshi"
            fontSize="14px"
            wrapperStyle={{
              paddingBottom: 40,
            }}
            content={
              <ChartLegend
                customColors={[
                  {
                    'url(#fade-gradient1)': THEME_COLORS.butterflyBlue,
                  },
                  { 'url(#fade-gradient2)': THEME_COLORS.gray[700] },
                ]}
              />
            }
          />
          <Line
            type="natural"
            dataKey="Inquiry"
            stroke="url(#fade-gradient1)"
            strokeWidth={6}
            dot={false}
            activeDot={{
              r: 12,
              fill: 'url(#fade-gradient1)',
            }}
          />
          <Line
            type="natural"
            dataKey="Booking"
            stroke="url(#fade-gradient2)"
            strokeWidth={6}
            dot={false}
            activeDot={{
              r: 12,
              fill: 'url(#fade-gradient2)',
            }}
          />
          <defs>
            <linearGradient
              id="fade-gradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor={THEME_COLORS.butterflyBlue}
                stopOpacity={0.1}
              />
              <stop
                offset="50%"
                stopColor={THEME_COLORS.butterflyBlue}
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor={THEME_COLORS.butterflyBlue}
                stopOpacity={0.1}
              />
            </linearGradient>

            <linearGradient
              id="fade-gradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor={THEME_COLORS.gray[700]}
                stopOpacity={0.1}
              />
              <stop
                offset="50%"
                stopColor={THEME_COLORS.gray[700]}
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor={THEME_COLORS.gray[700]}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
        </RechartsLineChart>
      </ResponsiveContainer>
    </VStack>
  );
};

export default LineChart;
